/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridDraggableColumn
        :index="columnIndex"
        :column="column"
        :is-header-focused="isHeaderFocused"
        @swapColumns="onSwapColumns"
        @remove="onRemoveColumn"
        @updateWidth="onUpdateWidth"
        @drop="onDrop">
        <GridTableCell
            :row="0"
            :column="columnIndex"
            :locked="true">
            <slot
                name="header"
                :column-index="columnIndex"
                :title="column.label"
                :sorted-column="sortedColumn">
                <GridInteractiveHeaderCell
                    :column-index="columnIndex"
                    :column="column"
                    :sorted-column="sortedColumn"
                    @focus="onHeaderFocus"
                    @sort="onSortColumn"
                    @remove="onRemoveColumn" />
            </slot>
        </GridTableCell>
        <slot
            v-if="isBasicFilter"
            name="filter"
            :is-locked="isFilterLocked"
            :filter="filter"
            :language-code="column.language"
            :column-index="columnIndex"
            :row-index="rowsOffset + basicFiltersOffset">
            <GridTableCell
                :locked="true"
                :row="rowsOffset + basicFiltersOffset"
                :column="columnIndex" />
        </slot>
        <template v-for="(row, rowIndex) in data">
            <slot
                name="cell"
                :data="row"
                :row-id="rowIds[rowIndex]"
                :column-id="column.id"
                :language-code="column.language"
                :column-index="columnIndex"
                :row-index="rowsOffset + rowIndex + basicFiltersOffset + 1"
                :is-locked="!isEditingAllowed"
                :is-copyable="isEditingAllowed" />
        </template>
    </GridDraggableColumn>
</template>

<script>
import GridDraggableColumn from '@Core/components/Grid/Layout/Table/Columns/GridDraggableColumn';
import GridInteractiveHeaderCell from '@Core/components/Grid/Layout/Table/Cells/Header/GridInteractiveHeaderCell';
import GridTableCell from '@Core/components/Grid/Layout/Table/Cells/GridTableCell';

export default {
    name: 'GridColumn',
    components: {
        GridDraggableColumn,
        GridInteractiveHeaderCell,
        GridTableCell,
    },
    props: {
        column: {
            type: Object,
            required: true,
        },
        filter: {
            type: Object,
            default: null,
        },
        sortedColumn: {
            type: Object,
            default: () => ({}),
        },
        data: {
            type: Array,
            default: () => [],
        },
        rowIds: {
            type: Array,
            default: () => [],
        },
        columnIndex: {
            type: Number,
            required: true,
        },
        rowsOffset: {
            type: Number,
            default: 0,
        },
        isBasicFilter: {
            type: Boolean,
            default: false,
        },
        isEditable: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isHeaderFocused: false,
        };
    },
    computed: {
        basicFiltersOffset() {
            return this.isBasicFilter ? 1 : 0;
        },
        isEditingAllowed() {
            return this.column.editable && this.isEditable;
        },
        isFilterLocked() {
            return typeof this.column.filter === 'undefined';
        },
    },
    methods: {
        onHeaderFocus(isFocused) {
            this.isHeaderFocused = isFocused;
        },
        onSortColumn(sortedColumn) {
            this.$emit('sort', sortedColumn);
        },
        onRemoveColumn(index) {
            this.$emit('remove', index);
        },
        onSwapColumns(payload) {
            this.$emit('swapColumns', payload);
        },
        onUpdateWidth(payload) {
            this.$emit('updateWidth', payload);
        },
        onDrop(payload) {
            this.$emit('drop', payload);
        },
    },
};
</script>
