package com.nepxion.discovery.console.desktop;

/**
 * <p>Title: Nepxion Discovery</p>
 * <p>Description: Nepxion Discovery</p>
 * <p>Copyright: Copyright (c) 2017-2050</p>
 * <p>Company: Nepxion</p>
 * @author Haojun Ren
 * @version 1.0
 */

import java.awt.Font;
import java.util.ArrayList;
import java.util.List;

import com.nepxion.discovery.console.desktop.common.component.AbstractConsoleHierarchy;
import com.nepxion.discovery.console.desktop.common.context.ConsoleUIContext;
import com.nepxion.discovery.console.desktop.common.icon.ConsoleIconFactory;
import com.nepxion.discovery.console.desktop.common.locale.ConsoleLocaleFactory;
import com.nepxion.discovery.console.desktop.workspace.toggle.ToggleConstant;
import com.nepxion.discovery.console.desktop.workspace.toggle.ToggleListener;
import com.nepxion.swing.element.ElementNode;
import com.nepxion.swing.list.toggle.AbstractToggleAdapter;
import com.nepxion.swing.list.toggle.JToggleList;
import com.nepxion.swing.shrinkbar.JShrinkOutlook;

public class ConsoleHierarchy extends AbstractConsoleHierarchy {
    private static final long serialVersionUID = 1L;

    @Override
    public void initialize() {
        createServiceControlShrinkOutlook();
    }

    private JShrinkOutlook createServiceControlShrinkOutlook() {
        List<ElementNode> elementNodes = new ArrayList<ElementNode>();
        elementNodes.add(new ElementNode(ToggleConstant.SERVICE_TOPOLOGY, ConsoleLocaleFactory.getString(ToggleConstant.SERVICE_TOPOLOGY), ConsoleIconFactory.getSwingIcon("component/ui_16.png"), ConsoleLocaleFactory.getString(ToggleConstant.SERVICE_TOPOLOGY)));

        JToggleList toggleList = createToggleList(elementNodes);
        toggleList.setSelectedIndex(0);

        JShrinkOutlook shrinkOutlook = shrinkOutlookBar.addShrinkOutlook(ConsoleLocaleFactory.getString("service_control"), ConsoleIconFactory.getSwingIcon("stereo/favorite_16.png"), ConsoleIconFactory.getSwingIcon("stereo/favorite_add_16.png"), ConsoleLocaleFactory.getString("service_control"), new Font(ConsoleUIContext.getFontName(), Font.BOLD, ConsoleUIContext.getMiddleFontSize()));
        shrinkOutlook.setContentPane(toggleList);
        shrinkOutlook.addPropertyChangeListener(new OutlookSelectionListener());

        return shrinkOutlook;
    }

    @Override
    public AbstractToggleAdapter createToggleListener(JToggleList toggleList) {
        return new ToggleListener(toggleList);
    }
}