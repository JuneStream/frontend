/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="tab-bar">
        <div class="tab-bar__items">
            <VerticalFixedScroll>
                <VerticalTabBarItem
                    v-for="(item, index) in items"
                    :key="index"
                    :index="index"
                    :item="item"
                    :is-selected="index === selectedTabIndex && isExpanded"
                    @select="onSelectTabBarItem" />
            </VerticalFixedScroll>
            <div class="tab-bar__expand-button">
                <FabButton
                    :theme="secondaryTheme"
                    @click.native="onExpand">
                    <template #icon="{ fillColor }">
                        <IconArrowDouble
                            :fill-color="fillColor"
                            :state="expendStateIcon" />
                    </template>
                </FabButton>
            </div>
        </div>
        <VerticalTabContent
            v-show="isExpanded"
            :item="items[selectedTabIndex]" />
    </div>
</template>

<script>

import { THEMES } from '@Core/defaults/buttons';
import { ARROW } from '@Core/defaults/icons';

export default {
    name: 'VerticalTabBar',
    components: {
        VerticalTabContent: () => import('@Core/components/Tab/VerticalTabContent'),
        VerticalTabBarItem: () => import('@Core/components/Tab/VerticalTabBarItem'),
        FabButton: () => import('@Core/components/Buttons/FabButton'),
        IconArrowDouble: () => import('@Core/components/Icons/Arrows/IconArrowDouble'),
        VerticalFixedScroll: () => import('@Core/components/Layout/Scroll/VerticalFixedScroll'),
    },
    props: {
        items: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            selectedTabIndex: 0,
            isExpanded: true,
        };
    },
    computed: {
        secondaryTheme() {
            return THEMES.SECONDARY;
        },
        expendStateIcon() {
            return this.isExpanded ? ARROW.LEFT : ARROW.RIGHT;
        },
    },
    methods: {
        onSelectTabBarItem(index) {
            this.selectedTabIndex = index;
            this.isExpanded = true;
            this.$emit('select', index);
        },
        onExpand() {
            this.isExpanded = !this.isExpanded;
        },
    },
};
</script>

<style lang="scss" scoped>
    .tab-bar {
        display: flex;
        height: 100%;

        &__items {
            position: relative;
            display: flex;
            flex-flow: column nowrap;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            width: 80px;
            box-sizing: border-box;
            background-color: $WHITESMOKE;
        }

        &__expand-button {
            position: absolute;
            bottom: 16px;
        }
    }
</style>