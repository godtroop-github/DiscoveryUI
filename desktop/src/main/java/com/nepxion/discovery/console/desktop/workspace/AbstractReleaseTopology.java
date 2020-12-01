package com.nepxion.discovery.console.desktop.workspace;

/**
 * <p>Title: Nepxion Discovery</p>
 * <p>Description: Nepxion Discovery</p>
 * <p>Copyright: Copyright (c) 2017-2050</p>
 * <p>Company: Nepxion</p>
 * @author Haojun Ren
 * @version 1.0
 */

import java.awt.Dimension;
import java.awt.event.ActionEvent;

import javax.swing.JToolBar;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.nepxion.discovery.common.entity.RuleEntity;
import com.nepxion.discovery.common.entity.SubscriptionType;
import com.nepxion.discovery.console.cache.ConsoleCache;
import com.nepxion.discovery.console.desktop.common.icon.ConsoleIconFactory;
import com.nepxion.discovery.console.desktop.common.locale.ConsoleLocaleFactory;
import com.nepxion.discovery.console.desktop.common.swing.dialog.JExceptionDialog;
import com.nepxion.discovery.console.desktop.common.util.ButtonUtil;
import com.nepxion.discovery.console.desktop.common.util.DimensionUtil;
import com.nepxion.discovery.console.desktop.workspace.panel.PreviewPanel;
import com.nepxion.discovery.console.desktop.workspace.panel.SubscriptionPanel;
import com.nepxion.discovery.console.desktop.workspace.processor.ReleaseProcessor;
import com.nepxion.discovery.console.desktop.workspace.type.ReleaseType;
import com.nepxion.discovery.console.desktop.workspace.type.TypeLocale;
import com.nepxion.swing.action.JSecurityAction;
import com.nepxion.swing.button.ButtonManager;
import com.nepxion.swing.handle.HandleManager;
import com.nepxion.swing.locale.SwingLocale;
import com.nepxion.swing.optionpane.JBasicOptionPane;
import com.nepxion.swing.scrollpane.JBasicScrollPane;
import com.nepxion.swing.textarea.JBasicTextArea;

public abstract class AbstractReleaseTopology extends AbstractTopology {
    private static final long serialVersionUID = 1L;

    private static final Logger LOG = LoggerFactory.getLogger(AbstractReleaseTopology.class);

    public static final String APOLLO = "Apollo";

    protected ReleaseType releaseType;
    protected SubscriptionType subscriptionType;

    protected String configType;
    protected String group;
    protected RuleEntity ruleEntity;

    public AbstractReleaseTopology(ReleaseType releaseType) {
        this.releaseType = releaseType;

        initializeToolBar();
        initializeOperationBar();
        initializeData();
    }

    public void initializeToolBar() {
        JToolBar toolBar = getGraph().getToolbar();
        toolBar.addSeparator();
        toolBar.add(ButtonUtil.createButton(createCreateAction()));
        toolBar.add(ButtonUtil.createButton(createOpenAction()));
        toolBar.add(ButtonUtil.createButton(createSaveAction()));
        toolBar.addSeparator();
        toolBar.add(ButtonUtil.createButton(createRemoveAction()));
        toolBar.add(ButtonUtil.createButton(createClearAction()));
        toolBar.addSeparator();
        toolBar.add(ButtonUtil.createButton(createPreviewAction()));
        toolBar.add(ButtonUtil.createButton(createSetAction()));
        toolBar.addSeparator();
        toolBar.add(ButtonUtil.createButton(createLayoutAction()));

        ButtonManager.updateUI(toolBar);
    }

    public void initializeData() {
        try {
            configType = ConsoleCache.getConfigType();
        } catch (Exception ex) {
            JExceptionDialog.traceException(HandleManager.getFrame(AbstractReleaseTopology.this), ConsoleLocaleFactory.getString("operation_failure"), ex);
        }
    }

    public void initializeView() {
        try {
            getReleaseProcessor().fromConfig(ruleEntity, dataBox);
        } catch (Exception e) {
            JBasicOptionPane.showMessageDialog(HandleManager.getFrame(this), e.getMessage(), SwingLocale.getString("warning"), JBasicOptionPane.WARNING_MESSAGE);
        }
    }

    public void showResult(Object result) {
        JBasicTextArea resultTextArea = new JBasicTextArea();
        resultTextArea.setLineWrap(true);
        resultTextArea.setText(result.toString());

        JBasicScrollPane resultScrollPane = new JBasicScrollPane(resultTextArea);
        resultScrollPane.setMaximumSize(new Dimension(800, 600));
        DimensionUtil.addHeight(resultScrollPane, 20);

        JBasicOptionPane.showOptionDialog(HandleManager.getFrame(this), resultScrollPane, ConsoleLocaleFactory.getString("execute_result"), JBasicOptionPane.DEFAULT_OPTION, JBasicOptionPane.PLAIN_MESSAGE, ConsoleIconFactory.getSwingIcon("banner/edit.png"), new Object[] { SwingLocale.getString("close") }, null, true);
    }

    public JSecurityAction createCreateAction() {
        JSecurityAction action = new JSecurityAction(ConsoleLocaleFactory.getString("create_text"), ConsoleIconFactory.getSwingIcon("theme/tree/plastic/tree_leaf.png"), ConsoleLocaleFactory.getString("create_config_tooltip")) {
            private static final long serialVersionUID = 1L;

            public void execute(ActionEvent e) {
                create();
            }
        };

        return action;
    }

    public JSecurityAction createOpenAction() {
        JSecurityAction action = new JSecurityAction(ConsoleLocaleFactory.getString("open_text"), ConsoleIconFactory.getSwingIcon("theme/tree/plastic/tree_open.png"), ConsoleLocaleFactory.getString("open_config_tooltip")) {
            private static final long serialVersionUID = 1L;

            public void execute(ActionEvent e) {
                SubscriptionPanel openPanel = new SubscriptionPanel();
                DimensionUtil.addSize(openPanel, 100, 10);

                int selectedOption = JBasicOptionPane.showOptionDialog(HandleManager.getFrame(AbstractReleaseTopology.this), openPanel, ConsoleLocaleFactory.getString("open_config_tooltip") + "【" + TypeLocale.getDescription(releaseType) + "】", JBasicOptionPane.DEFAULT_OPTION, JBasicOptionPane.PLAIN_MESSAGE, ConsoleIconFactory.getSwingIcon("banner/net.png"), new Object[] { SwingLocale.getString("confirm"), SwingLocale.getString("cancel") }, null, true);
                if (selectedOption != 0) {
                    return;
                }
            }
        };

        return action;
    }

    public JSecurityAction createSaveAction() {
        JSecurityAction action = new JSecurityAction(ConsoleLocaleFactory.getString("save_text"), ConsoleIconFactory.getSwingIcon("save.png"), ConsoleLocaleFactory.getString("save_config_tooltip")) {
            private static final long serialVersionUID = 1L;

            public void execute(ActionEvent e) {
                String config = getReleaseProcessor().toConfig(ruleEntity, dataBox);
                if (StringUtils.isEmpty(config)) {
                    JBasicOptionPane.showMessageDialog(HandleManager.getFrame(AbstractReleaseTopology.this), ConsoleLocaleFactory.getString("config_not_null"), SwingLocale.getString("warning"), JBasicOptionPane.WARNING_MESSAGE);

                    return;
                }

                int selectedValue = JBasicOptionPane.showConfirmDialog(HandleManager.getFrame(AbstractReleaseTopology.this), ConsoleLocaleFactory.getString("save_confirm") + "\n" + getKey(), SwingLocale.getString("confirm"), JBasicOptionPane.YES_NO_OPTION);
                if (selectedValue != JBasicOptionPane.OK_OPTION) {
                    return;
                }

                save(config);
            }
        };

        return action;
    }

    public JSecurityAction createRemoveAction() {
        JSecurityAction action = new JSecurityAction(ConsoleLocaleFactory.getString("remove_text"), ConsoleIconFactory.getSwingIcon("cut.png"), getRemoveTooltip()) {
            private static final long serialVersionUID = 1L;

            public void execute(ActionEvent e) {
                remove();
            }
        };

        return action;
    }

    public JSecurityAction createClearAction() {
        JSecurityAction action = new JSecurityAction(ConsoleLocaleFactory.getString("clear_text"), ConsoleIconFactory.getSwingIcon("paint.png"), getClearTooltip()) {
            private static final long serialVersionUID = 1L;

            public void execute(ActionEvent e) {
                clear();
            }
        };

        return action;
    }

    public JSecurityAction createPreviewAction() {
        JSecurityAction action = new JSecurityAction(ConsoleLocaleFactory.getString("preview_text"), ConsoleIconFactory.getSwingIcon("ticket.png"), ConsoleLocaleFactory.getString("preview_config_tooltip")) {
            private static final long serialVersionUID = 1L;

            public void execute(ActionEvent e) {
                String config = getReleaseProcessor().toConfig(ruleEntity, dataBox);
                if (StringUtils.isEmpty(config)) {
                    JBasicOptionPane.showMessageDialog(HandleManager.getFrame(AbstractReleaseTopology.this), ConsoleLocaleFactory.getString("config_not_null"), SwingLocale.getString("warning"), JBasicOptionPane.WARNING_MESSAGE);

                    return;
                }

                PreviewPanel previewPanel = PreviewPanel.getInstance();

                String key = getKey();

                previewPanel.setKey(key);
                previewPanel.setConfig(config);

                int selectedOption = JBasicOptionPane.showOptionDialog(HandleManager.getFrame(AbstractReleaseTopology.this), previewPanel, ConsoleLocaleFactory.getString("preview_config_tooltip"), JBasicOptionPane.DEFAULT_OPTION, JBasicOptionPane.PLAIN_MESSAGE, ConsoleIconFactory.getSwingIcon("banner/property.png"), new Object[] { ConsoleLocaleFactory.getString("save_config_text"), ConsoleLocaleFactory.getString("close_preview_text") }, null, true);
                if (selectedOption != 0) {
                    return;
                }

                config = previewPanel.getConfig();
                if (StringUtils.isEmpty(config)) {
                    JBasicOptionPane.showMessageDialog(HandleManager.getFrame(AbstractReleaseTopology.this), ConsoleLocaleFactory.getString("config_not_null"), SwingLocale.getString("warning"), JBasicOptionPane.WARNING_MESSAGE);

                    return;
                }

                save(config);
            }
        };

        return action;
    }

    public String getKey() {
        String key = null;
        if (StringUtils.equals(configType, APOLLO)) {
            key = group + "-" + getServiceId();
        } else {
            key = "Data ID=" + getServiceId() + " | Group=" + group;
        }

        return key;
    }

    public String getGroup() {
        return group;
    }

    public void save(String config) {
        String key = getKey();
        String group = getGroup();
        String serviceId = getServiceId();

        LOG.info("Save Config, key={}, config=\n{}", key, config);

        String result = getReleaseProcessor().saveConfig(group, serviceId, config);
        showResult(result);
    }

    public abstract ReleaseType getReleaseType();

    public abstract String getServiceId();

    public abstract String getRemoveTooltip();

    public abstract String getClearTooltip();

    public abstract void create();

    public abstract void remove();

    public abstract void clear();

    public abstract ReleaseProcessor getReleaseProcessor();
}