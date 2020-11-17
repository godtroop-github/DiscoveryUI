package com.nepxion.discovery.console.desktop.workspace.panel;

/**
 * <p>Title: Nepxion Discovery</p>
 * <p>Description: Nepxion Discovery</p>
 * <p>Copyright: Copyright (c) 2017-2050</p>
 * <p>Company: Nepxion</p>
 * @author Haojun Ren
 * @version 1.0
 */

import java.awt.BorderLayout;
import java.awt.event.ActionEvent;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.swing.BorderFactory;
import javax.swing.JComponent;
import javax.swing.JPanel;

import org.apache.commons.lang3.StringUtils;
import org.springframework.expression.TypeComparator;

import com.nepxion.discovery.common.constant.DiscoveryConstant;
import com.nepxion.discovery.common.expression.DiscoveryExpressionResolver;
import com.nepxion.discovery.common.expression.DiscoveryTypeComparor;
import com.nepxion.discovery.common.util.StringUtil;
import com.nepxion.discovery.console.desktop.common.icon.ConsoleIconFactory;
import com.nepxion.discovery.console.desktop.common.locale.ConsoleLocaleFactory;
import com.nepxion.discovery.console.desktop.common.util.DimensionUtil;
import com.nepxion.discovery.console.desktop.common.util.TextFieldUtil;
import com.nepxion.discovery.console.desktop.workspace.type.NodeType;
import com.nepxion.swing.action.JSecurityAction;
import com.nepxion.swing.button.JClassicButton;
import com.nepxion.swing.combobox.JBasicComboBox;
import com.nepxion.swing.container.ContainerManager;
import com.nepxion.swing.handle.HandleManager;
import com.nepxion.swing.label.JBasicLabel;
import com.nepxion.swing.layout.filed.FiledLayout;
import com.nepxion.swing.layout.table.TableLayout;
import com.nepxion.swing.locale.SwingLocale;
import com.nepxion.swing.optionpane.JBasicOptionPane;
import com.nepxion.swing.shrinkbar.JShrinkShortcut;
import com.nepxion.swing.tabbedpane.JBasicTabbedPane;
import com.nepxion.swing.textfield.JBasicTextField;

public class BlueGreenConditionPanel extends JPanel {
    private static final long serialVersionUID = 1L;

    protected ConditionBar blueConditionBar;
    protected ConditionBar greenConditionBar;

    protected JBasicTabbedPane conditionTabbedPane;

    protected TypeComparator typeComparator = new DiscoveryTypeComparor();

    public BlueGreenConditionPanel() {
        blueConditionBar = new ConditionBar(NodeType.BLUE);
        greenConditionBar = new ConditionBar(NodeType.GREEN);

        conditionTabbedPane = new JBasicTabbedPane();
        conditionTabbedPane.addTab(" " + NodeType.BLUE.getDescription() + " ", blueConditionBar, NodeType.BLUE.getDescription());
        conditionTabbedPane.addTab(" " + NodeType.GREEN.getDescription() + " ", greenConditionBar, NodeType.GREEN.getDescription());

        setLayout(new FiledLayout(FiledLayout.COLUMN, FiledLayout.FULL, 10));
        add(conditionTabbedPane);
    }

    public void setGreenConditionBarEnabled(boolean enabled) {
        setComponentEnabled(greenConditionBar, enabled);
    }

    public void setComponentEnabled(JComponent component, boolean enabled) {
        if (component.getComponentCount() > 0) {
            for (int i = 0; i < component.getComponentCount(); i++) {
                if (component.getComponent(i) instanceof JComponent) {
                    JComponent childComponent = (JComponent) component.getComponent(i);
                    childComponent.setEnabled(enabled);

                    setComponentEnabled(childComponent, enabled);
                }
            }
        }
    }

    public String getBlueCondition() {
        return blueConditionBar.getCondition();
    }

    public String getGreenCondition() {
        return greenConditionBar.getCondition();
    }

    public void showBlueConditionNotNullTip() {
        conditionTabbedPane.setSelectedIndex(0);
        blueConditionBar.showConditionNotNullTip();
    }

    public void showGreenConditionNotNullTip() {
        conditionTabbedPane.setSelectedIndex(1);
        greenConditionBar.showConditionNotNullTip();
    }

    public class ConditionBar extends JPanel {
        private static final long serialVersionUID = 1L;

        protected int initialConditionItemCount = 1;
        protected List<ConditionItem> conditionItems = new ArrayList<ConditionItem>();

        protected JPanel conditionItemBar;
        protected JBasicTextField conditionTextField;
        protected JBasicTextField validateTextField;

        public ConditionBar(NodeType nodeType) {
            JShrinkShortcut shrinkShortcut = new JShrinkShortcut();
            shrinkShortcut.setTitle(nodeType.getDescription());
            shrinkShortcut.setIcon(nodeType == NodeType.BLUE ? ConsoleIconFactory.getSwingIcon("circle_blue.png") : ConsoleIconFactory.getSwingIcon("circle_green.png"));
            shrinkShortcut.setToolTipText(nodeType.getDescription());

            conditionItemBar = new JPanel();
            conditionTextField = new JBasicTextField();
            validateTextField = new JBasicTextField();

            double[][] size = {
                    { TableLayout.PREFERRED, TableLayout.FILL, TableLayout.PREFERRED },
                    { TableLayout.PREFERRED, TableLayout.PREFERRED }
            };

            TableLayout tableLayout = new TableLayout(size);
            tableLayout.setHGap(0);
            tableLayout.setVGap(5);

            JPanel conditionBar = new JPanel();
            conditionBar.setLayout(tableLayout);
            conditionBar.add(DimensionUtil.addWidth(new JBasicLabel(ConsoleLocaleFactory.getString("aggregate_text")), 5), "0, 0");
            conditionBar.add(conditionTextField, "1, 0");
            conditionBar.add(DimensionUtil.setWidth(new JClassicButton(createAggregateConditionAction(conditionItems)), 30), "2, 0");
            conditionBar.add(DimensionUtil.addWidth(new JBasicLabel(ConsoleLocaleFactory.getString("validate_text")), 5), "0, 1");
            conditionBar.add(TextFieldUtil.setTip(validateTextField, ConsoleLocaleFactory.getString("validate_condition_example")), "1, 1");
            conditionBar.add(DimensionUtil.setWidth(new JClassicButton(createValidateConditionAction()), 30), "2, 1");

            setLayout(new BorderLayout());
            setBorder(BorderFactory.createEmptyBorder(5, 0, 0, 0));
            // add(shrinkShortcut, BorderLayout.NORTH);
            add(conditionItemBar, BorderLayout.CENTER);
            add(conditionBar, BorderLayout.SOUTH);

            for (int i = 0; i < initialConditionItemCount; i++) {
                conditionItems.add(new ConditionItem(UUID.randomUUID().toString()));
            }
            layoutConditionItems();
        }

        public void layoutConditionItems() {
            conditionItemBar.removeAll();

            double[] row = new double[conditionItems.size() + 1];
            for (int i = 0; i < row.length; i++) {
                row[i] = TableLayout.PREFERRED;
            }
            double[][] size = {
                    { TableLayout.FILL, TableLayout.PREFERRED, TableLayout.FILL, TableLayout.PREFERRED, TableLayout.PREFERRED, TableLayout.PREFERRED },
                    row
            };

            TableLayout tableLayout = new TableLayout(size);
            tableLayout.setHGap(0);
            tableLayout.setVGap(5);

            int index = 0;

            conditionItemBar.setLayout(tableLayout);
            conditionItemBar.add(new JBasicLabel(ConsoleLocaleFactory.getString("parameter")), "0, " + index);
            conditionItemBar.add(new JBasicLabel(ConsoleLocaleFactory.getString("arithmetic")), "1, " + index);
            conditionItemBar.add(new JBasicLabel(ConsoleLocaleFactory.getString("value")), "2, " + index);
            conditionItemBar.add(new JBasicLabel(ConsoleLocaleFactory.getString("relational")), "3, " + index + ", 5, " + index);

            index++;

            for (ConditionItem conditionItem : conditionItems) {
                conditionItemBar.add(conditionItem.parameterTextField, "0, " + index);
                conditionItemBar.add(conditionItem.arithmeticComboBox, "1, " + index);
                conditionItemBar.add(conditionItem.valueTextField, "2, " + index);
                conditionItemBar.add(conditionItem.relationalComboBox, "3, " + index);
                conditionItemBar.add(conditionItem.addButton, "4, " + index);
                conditionItemBar.add(conditionItem.removeButton, "5, " + index);

                conditionItem.relationalComboBox.setVisible(index != conditionItems.size());

                index++;
            }

            ContainerManager.update(conditionItemBar);
        }

        public ConditionItem getConditionItem(String uuid) {
            for (ConditionItem conditionItem : conditionItems) {
                if (StringUtils.equals(conditionItem.uuid, uuid)) {
                    return conditionItem;
                }
            }

            return null;
        }

        public String getCondition() {
            return conditionTextField.getText().trim();
        }

        public void showConditionNotNullTip() {
            conditionTextField.showTip(ConsoleLocaleFactory.getString("condition_not_null"), ConsoleIconFactory.getSwingIcon("error_message.png"), 1, 12);
        }

        public void showValidationInvalidFormatTip() {
            validateTextField.showTip(ConsoleLocaleFactory.getString("validate_condition_invalid_format"), ConsoleIconFactory.getSwingIcon("error_message.png"), 1, 12);
        }

        public void showValidationResultTip(boolean validated) {
            validateTextField.showTip(ConsoleLocaleFactory.getString("validate_condition_result") + " : " + validated, ConsoleIconFactory.getSwingIcon(validated ? "question_message.png" : "error_message.png"), 1, 12);
        }

        public class ConditionItem {
            protected JBasicTextField parameterTextField = new JBasicTextField();
            protected JBasicComboBox arithmeticComboBox = new JBasicComboBox(new String[] { "==", "!=", ">", ">=", "<", "<=", "matches" });
            protected JBasicTextField valueTextField = new JBasicTextField();
            protected JBasicComboBox relationalComboBox = new JBasicComboBox(new String[] { "&&", "||" });
            protected JClassicButton addButton = new JClassicButton(createAddConditionItemAction());
            protected JClassicButton removeButton = new JClassicButton(createRemoveConditionItemAction());

            protected String uuid;

            public ConditionItem(String uuid) {
                this.uuid = uuid;

                addButton.setName(uuid);
                removeButton.setName(uuid);

                DimensionUtil.setWidth(addButton, 30);
                DimensionUtil.setWidth(removeButton, 30);
            }
        }

        public JSecurityAction createAddConditionItemAction() {
            JSecurityAction action = new JSecurityAction(ConsoleIconFactory.getSwingIcon("add.png"), ConsoleLocaleFactory.getString("add_condition_item")) {
                private static final long serialVersionUID = 1L;

                public void execute(ActionEvent e) {
                    JClassicButton addButton = (JClassicButton) e.getSource();
                    String uuid = addButton.getName();

                    ConditionItem conditionItem = getConditionItem(uuid);
                    if (conditionItem == null) {
                        return;
                    }

                    conditionItems.add(conditionItems.indexOf(conditionItem) + 1, new ConditionItem(UUID.randomUUID().toString()));
                    layoutConditionItems();
                }
            };

            return action;
        }

        public JSecurityAction createRemoveConditionItemAction() {
            JSecurityAction action = new JSecurityAction(ConsoleIconFactory.getSwingIcon("delete.png"), ConsoleLocaleFactory.getString("remove_condition_item")) {
                private static final long serialVersionUID = 1L;

                public void execute(ActionEvent e) {
                    if (conditionItems.size() < 2) {
                        JBasicOptionPane.showMessageDialog(HandleManager.getFrame(BlueGreenConditionPanel.this), ConsoleLocaleFactory.getString("condition_item_one_at_least"), SwingLocale.getString("warning"), JBasicOptionPane.WARNING_MESSAGE);

                        return;
                    }

                    JClassicButton removeButton = (JClassicButton) e.getSource();
                    String uuid = removeButton.getName();

                    ConditionItem conditionItem = getConditionItem(uuid);
                    if (conditionItem == null) {
                        return;
                    }

                    conditionItems.remove(conditionItem);
                    layoutConditionItems();
                }
            };

            return action;
        }

        public JSecurityAction createAggregateConditionAction(List<ConditionItem> conditionItems) {
            JSecurityAction action = new JSecurityAction(ConsoleIconFactory.getSwingIcon("netbean/action_16.png"), ConsoleLocaleFactory.getString("aggregate_condition_tooltip")) {
                private static final long serialVersionUID = 1L;

                public void execute(ActionEvent e) {
                    StringBuilder stringBuilder = new StringBuilder();

                    int index = 0;
                    for (ConditionItem conditionItem : conditionItems) {
                        String parameter = conditionItem.parameterTextField.getText().trim();
                        String arithmetic = conditionItem.arithmeticComboBox.getSelectedItem().toString();
                        String value = conditionItem.valueTextField.getText().trim();
                        String relational = conditionItem.relationalComboBox.getSelectedItem().toString();

                        if (StringUtils.isBlank(parameter)) {
                            conditionItem.parameterTextField.showTip(ConsoleLocaleFactory.getString("condition_item_parameter_not_null"), ConsoleIconFactory.getSwingIcon("error_message.png"), 1, 12);

                            return;
                        }

                        stringBuilder.append("#H['").append(parameter).append("'] ").append(arithmetic).append(" '").append(value).append("'");

                        if (index < conditionItems.size() - 1) {
                            stringBuilder.append(" ").append(relational).append(" ");
                        }

                        index++;
                    }

                    conditionTextField.setText(stringBuilder.toString());
                }
            };

            return action;
        }

        public JSecurityAction createValidateConditionAction() {
            JSecurityAction action = new JSecurityAction(ConsoleIconFactory.getSwingIcon("netbean/linear_16.png"), ConsoleLocaleFactory.getString("validate_condition_tooltip")) {
                private static final long serialVersionUID = 1L;

                public void execute(ActionEvent e) {
                    String condition = conditionTextField.getText().trim();
                    String validation = validateTextField.getText().trim();

                    if (StringUtils.isBlank(condition)) {
                        showConditionNotNullTip();

                        return;
                    }

                    Map<String, String> map = null;
                    try {
                        map = StringUtil.splitToMap(validation);
                    } catch (Exception ex) {
                        showValidationInvalidFormatTip();

                        return;
                    }

                    boolean validated = DiscoveryExpressionResolver.eval(condition, DiscoveryConstant.EXPRESSION_PREFIX, map, typeComparator);

                    showValidationResultTip(validated);
                }
            };

            return action;
        }
    }
}