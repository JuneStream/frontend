/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridTableCell
        :row="rowIndex"
        :column="columnIndex"
        :locked="isLocked"
        :disabled="isDisabled">
        <template #default="{ isEditing }">
            <GridTextEditCell
                v-if="isEditing"
                :value="value"
                :width="$el.offsetWidth"
                @input="onValueChange" />
            <GridFilterPresentationCell
                v-else
                :value="value" />
        </template>
    </GridTableCell>
</template>

<script>
import { FILTER_OPERATOR } from '@Core/defaults/operators';
import GridTableCell from '@Core/components/Grid/Layout/Table/Cells/GridTableCell';
import GridFilterPresentationCell from '@Core/components/Grid/Layout/Table/Cells/Presentation/GridFilterPresentationCell';

export default {
    name: 'GridTextFilterCell',
    components: {
        GridFilterPresentationCell,
        GridTableCell,
        GridTextEditCell: () => import('@Core/components/Grid/Layout/Table/Cells/Edit/GridTextEditCell'),
    },
    props: {
        rowIndex: {
            type: Number,
            required: true,
        },
        columnIndex: {
            type: Number,
            required: true,
        },
        filter: {
            type: Object,
            default: null,
        },
        isDisabled: {
            type: Boolean,
            default: false,
        },
        isLocked: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        value() {
            if (!this.filter) return '';

            return this.filter.value;
        },
    },
    methods: {
        onValueChange(value) {
            this.$emit('filter', {
                index: this.columnIndex,
                value,
                operator: FILTER_OPERATOR.EQUAL,
            });
        },
    },
};
</script>
