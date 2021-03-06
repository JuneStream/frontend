/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ActionBaseButton
        :options="options"
        :fixed-content="fixedContent"
        @focus="onFocus"
        @hover="onHover"
        @input="onSelect">
        <template #button>
            <IconButton
                :theme="theme"
                :size="size"
                :disabled="disabled">
                <template #icon>
                    <!--
                        @slot Append element - icon recommended
                        @binding {string} color color of an element
                    -->
                    <slot
                        name="icon"
                        :color="iconFillColor" />
                </template>
            </IconButton>
        </template>
        <template #option="{ option }">
            <!--
                @slot List option
                @binding {object} option
            -->
            <slot
                name="option"
                :option="option" />
        </template>
    </ActionBaseButton>
</template>

<script>
import { SIZE, THEME } from '@Core/defaults/theme';
import {
    GREEN, GRAPHITE, WHITE, GREY_DARK,
} from '@Core/assets/scss/_js-variables/colors.scss';
import ActionBaseButton from '@Core/components/Buttons/ActionBaseButton';
import IconButton from '@Core/components/Buttons/IconButton';

export default {
    name: 'ActionButton',
    components: {
        ActionBaseButton,
        IconButton,
    },
    props: {
        /**
         * The theme of the button
         * @values primary, secondary
         */
        theme: {
            type: String,
            default: THEME.PRIMARY,
            validator: value => Object.values(THEME).indexOf(value) !== -1,
        },
        /**
         * The size of the button
         * @values regular, small, tiny
         */
        size: {
            type: String,
            default: SIZE.REGULAR,
            validator: value => Object.values(SIZE).indexOf(value) !== -1,
        },
        /**
         * The disabled state of the button
         * @values primary, secondary
         */
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         * The options of the dropdown
         */
        options: {
            type: Array,
            default: () => [],
        },
        /**
         * The flag which tells if the dropdown has fixed content to it's parent width
         */
        fixedContent: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isFocused: false,
            isHovered: false,
        };
    },
    computed: {
        iconFillColor() {
            if (this.theme !== THEME.PRIMARY) {
                if (this.disabled) {
                    return GREY_DARK;
                }
                if (this.isHovered || this.isFocused) {
                    return GREEN;
                }
                return GRAPHITE;
            }

            return WHITE;
        },
    },
    methods: {
        onHover(isHovered) {
            this.isHovered = isHovered;
        },
        onFocus(isFocused) {
            this.isFocused = isFocused;
            this.$emit('focus', isFocused);
        },
        onSelect(option) {
            this.$emit('input', option);
        },
    },
};
</script>
