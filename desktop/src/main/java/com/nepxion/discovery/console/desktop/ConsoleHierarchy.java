package com.nepxion.discovery.console.desktop;

/**
 * <p>Title: Nepxion Discovery</p>
 * <p>Description: Nepxion Discovery</p>
 * <p>Copyright: Copyright (c) 2017-2050</p>
 * <p>Company: Nepxion</p>
 * @author Haojun Ren
 * @version 1.0
 */

import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.util.ArrayList;
import java.util.List;

import javax.swing.BorderFactory;
import javax.swing.JPanel;

import com.nepxion.discovery.console.desktop.context.UIContext;
import com.nepxion.discovery.console.desktop.icon.ConsoleIconFactory;
import com.nepxion.discovery.console.desktop.locale.ConsoleLocaleFactory;
import com.nepxion.discovery.console.desktop.toggle.ConsoleToggleConstant;
import com.nepxion.discovery.console.desktop.toggle.ConsoleToggleListener;
import com.nepxion.swing.element.ElementNode;
import com.nepxion.swing.list.toggle.JToggleList;
import com.nepxion.swing.shrinkbar.JShrinkBar;
import com.nepxion.swing.shrinkbar.JShrinkOutlook;
import com.nepxion.swing.shrinkbar.JShrinkOutlookBar;
import com.nepxion.swing.shrinkbar.ShrinkListCellRenderer;
import com.nepxion.swing.shrinkbar.ShrinkOutlookSelectionListener;
import com.nepxion.swing.style.texture.shrink.IHeaderTextureStyle;
import com.nepxion.swing.style.texture.shrink.IOutlookTextureStyle;
import com.nepxion.util.data.CollectionUtil;

public class ConsoleHierarchy extends JPanel {
    private static final long serialVersionUID = 1L;

    private JShrinkBar shrinkContentBar;
    private JShrinkOutlookBar shrinkOutlookBar;

    public ConsoleHierarchy(IHeaderTextureStyle headerTextureStyle, IOutlookTextureStyle outlookTextureStyle) {
        shrinkContentBar = new JShrinkBar(JShrinkBar.PLACEMENT_EAST, JShrinkBar.CONTENT_PANE_TYPE_LABEL, headerTextureStyle);
        shrinkContentBar.setShrinkable(false);
        shrinkContentBar.setTitle(ConsoleLocaleFactory.getString("content_bar"));
        shrinkContentBar.setToolTipText(ConsoleLocaleFactory.getString("content_bar"));
        shrinkContentBar.setIcon(ConsoleIconFactory.getSwingIcon("paste.png"));
        shrinkContentBar.setTitleFont(new Font(UIContext.getFontName(), Font.BOLD, UIContext.getLargeFontSize()));
        shrinkContentBar.getShrinkHeader().getLabel().addMouseListener(new ShrinkContentBarMouseListener());

        shrinkOutlookBar = new JShrinkOutlookBar(JShrinkBar.PLACEMENT_WEST, JShrinkBar.CONTENT_PANE_TYPE_LABEL, headerTextureStyle, outlookTextureStyle);
        shrinkOutlookBar.setTitle(ConsoleLocaleFactory.getString("navigator_bar"));
        shrinkOutlookBar.setToolTipText(ConsoleLocaleFactory.getString("navigator_bar"));
        shrinkOutlookBar.setIcon(ConsoleIconFactory.getSwingIcon("hierarchy.png"));
        shrinkOutlookBar.setTitleFont(new Font(UIContext.getFontName(), Font.BOLD, UIContext.getLargeFontSize()));
        shrinkOutlookBar.setPreferredSize(new Dimension(210, shrinkOutlookBar.getPreferredSize().height));

        createBlueGreenManageShrinkOutlook(shrinkOutlookBar);
        createGrayManageShrinkOutlook(shrinkOutlookBar);
        createBlacklistManageShrinkOutlook(shrinkOutlookBar);

        shrinkOutlookBar.getShrinkOutlook(0).setSelected(true);

        setLayout(new BorderLayout(5, 5));
        add(shrinkContentBar, BorderLayout.CENTER);
        add(shrinkOutlookBar, BorderLayout.WEST);
    }

    private JShrinkOutlook createBlueGreenManageShrinkOutlook(JShrinkOutlookBar shrinkOutlookBar) {
        List<ElementNode> elementNodes = new ArrayList<ElementNode>();
        elementNodes.add(new ElementNode(ConsoleToggleConstant.BLUE_GREEN_LIST, ConsoleLocaleFactory.getString(ConsoleToggleConstant.BLUE_GREEN_LIST), ConsoleIconFactory.getSwingIcon("component/ui_16.png"), ConsoleLocaleFactory.getString(ConsoleToggleConstant.BLUE_GREEN_LIST)));
        elementNodes.add(new ElementNode(ConsoleToggleConstant.BLUE_GREEN_DEPLOY, ConsoleLocaleFactory.getString(ConsoleToggleConstant.BLUE_GREEN_DEPLOY), ConsoleIconFactory.getSwingIcon("component/ui_16.png"), ConsoleLocaleFactory.getString(ConsoleToggleConstant.BLUE_GREEN_DEPLOY)));

        JToggleList list = createList(elementNodes);
        list.setSelectedIndex(0);

        JShrinkOutlook shrinkOutlook = shrinkOutlookBar.addShrinkOutlook(ConsoleLocaleFactory.getString("blue_green_manage"), ConsoleIconFactory.getSwingIcon("stereo/favorite_16.png"), ConsoleIconFactory.getSwingIcon("stereo/favorite_add_16.png"), ConsoleLocaleFactory.getString("blue_green_manage"), new Font(UIContext.getFontName(), Font.BOLD, UIContext.getMiddleFontSize()));
        shrinkOutlook.setContentPane(list);
        shrinkOutlook.addPropertyChangeListener(new OutlookSelectionListener());

        return shrinkOutlook;
    }

    private JShrinkOutlook createGrayManageShrinkOutlook(JShrinkOutlookBar shrinkOutlookBar) {
        List<ElementNode> elementNodes = new ArrayList<ElementNode>();
        elementNodes.add(new ElementNode(ConsoleToggleConstant.GRAY_LIST, ConsoleLocaleFactory.getString(ConsoleToggleConstant.GRAY_LIST), ConsoleIconFactory.getSwingIcon("component/ui_16.png"), ConsoleLocaleFactory.getString(ConsoleToggleConstant.GRAY_LIST)));
        elementNodes.add(new ElementNode(ConsoleToggleConstant.GRAY_RELEASE, ConsoleLocaleFactory.getString(ConsoleToggleConstant.GRAY_RELEASE), ConsoleIconFactory.getSwingIcon("component/ui_16.png"), ConsoleLocaleFactory.getString(ConsoleToggleConstant.GRAY_RELEASE)));

        JToggleList list = createList(elementNodes);
        list.setSelectedIndex(0);

        JShrinkOutlook shrinkOutlook = shrinkOutlookBar.addShrinkOutlook(ConsoleLocaleFactory.getString("gray_manage"), ConsoleIconFactory.getSwingIcon("stereo/favorite_16.png"), ConsoleIconFactory.getSwingIcon("stereo/favorite_add_16.png"), ConsoleLocaleFactory.getString("gray_manage"), new Font(UIContext.getFontName(), Font.BOLD, UIContext.getMiddleFontSize()));
        shrinkOutlook.setContentPane(list);
        shrinkOutlook.addPropertyChangeListener(new OutlookSelectionListener());

        return shrinkOutlook;
    }

    private JShrinkOutlook createBlacklistManageShrinkOutlook(JShrinkOutlookBar shrinkOutlookBar) {
        List<ElementNode> elementNodes = new ArrayList<ElementNode>();
        elementNodes.add(new ElementNode(ConsoleToggleConstant.BLACKLIST_ID, ConsoleLocaleFactory.getString(ConsoleToggleConstant.BLACKLIST_ID), ConsoleIconFactory.getSwingIcon("component/ui_16.png"), ConsoleLocaleFactory.getString(ConsoleToggleConstant.BLACKLIST_ID)));
        elementNodes.add(new ElementNode(ConsoleToggleConstant.BLACKLIST_ADDRESS, ConsoleLocaleFactory.getString(ConsoleToggleConstant.BLACKLIST_ADDRESS), ConsoleIconFactory.getSwingIcon("component/ui_16.png"), ConsoleLocaleFactory.getString(ConsoleToggleConstant.BLACKLIST_ADDRESS)));

        JToggleList list = createList(elementNodes);
        list.setSelectedIndex(0);

        JShrinkOutlook shrinkOutlook = shrinkOutlookBar.addShrinkOutlook(ConsoleLocaleFactory.getString("blacklist_manage"), ConsoleIconFactory.getSwingIcon("stereo/favorite_16.png"), ConsoleIconFactory.getSwingIcon("stereo/favorite_add_16.png"), ConsoleLocaleFactory.getString("blacklist_manage"), new Font(UIContext.getFontName(), Font.BOLD, UIContext.getMiddleFontSize()));
        shrinkOutlook.setContentPane(list);
        shrinkOutlook.addPropertyChangeListener(new OutlookSelectionListener());

        return shrinkOutlook;
    }

    @SuppressWarnings("unchecked")
    private JToggleList createList(List<ElementNode> elementNodes) {
        JToggleList list = new JToggleList(CollectionUtil.parseVector(elementNodes));
        list.setSelectionMode(JToggleList.SINGLE_SELECTION);
        list.setBorder(BorderFactory.createEmptyBorder(5, 0, 5, 0));
        list.setCellRenderer(new ShrinkListCellRenderer(list, BorderFactory.createEmptyBorder(0, 10, 0, 0), 22));
        list.setToggleContentPanel(shrinkContentBar);
        list.setToggleAdapter(new ConsoleToggleListener(list));

        return list;
    }

    private class ShrinkContentBarMouseListener extends MouseAdapter {
        public void mouseClicked(MouseEvent e) {
            if (e.getClickCount() > 1) {
                boolean isShrinked = !shrinkOutlookBar.isShrinked();
                shrinkOutlookBar.setShrinked(isShrinked);
            }
        }
    }

    private class OutlookSelectionListener extends ShrinkOutlookSelectionListener {
        public void selectionStateChanged(JShrinkOutlook shrinkOutlook) {
            JToggleList toggleList = (JToggleList) shrinkOutlook.getContentPane();
            toggleList.executeSelection(-1, toggleList.getSelectedIndex());
        }
    }
}