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
import com.nepxion.discovery.console.desktop.common.context.UIContext;
import com.nepxion.discovery.console.desktop.common.icon.ConsoleIconFactory;
import com.nepxion.discovery.console.desktop.common.locale.ConsoleLocaleFactory;
import com.nepxion.discovery.console.desktop.workspace.toggle.ConsoleToggleConstant;
import com.nepxion.swing.element.ElementNode;
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
        elementNodes.add(new ElementNode(ConsoleToggleConstant.SERVICE_TOPOLOGY, ConsoleLocaleFactory.getString(ConsoleToggleConstant.SERVICE_TOPOLOGY), ConsoleIconFactory.getSwingIcon("component/ui_16.png"), ConsoleLocaleFactory.getString(ConsoleToggleConstant.SERVICE_TOPOLOGY)));

        JToggleList list = createList(elementNodes);
        list.setSelectedIndex(0);

        JShrinkOutlook shrinkOutlook = shrinkOutlookBar.addShrinkOutlook(ConsoleLocaleFactory.getString("service_control"), ConsoleIconFactory.getSwingIcon("stereo/favorite_16.png"), ConsoleIconFactory.getSwingIcon("stereo/favorite_add_16.png"), ConsoleLocaleFactory.getString("service_control"), new Font(UIContext.getFontName(), Font.BOLD, UIContext.getMiddleFontSize()));
        shrinkOutlook.setContentPane(list);
        shrinkOutlook.addPropertyChangeListener(new OutlookSelectionListener());

        return shrinkOutlook;
    }
}