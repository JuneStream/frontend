/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridTableCell
        :row="rowIndex"
        :column="columnIndex"
        :locked="isLocked"
        :draft="cellData.isDraft"
        :error="Boolean(errorMessages)"
        :edit-key-code="editKeyCode"
        :disabled="isDisabled"
        :copyable="isCopyable"
        @copy="onCopyValues">
        <GridHintPresentationCell
            :value="cellData.value"
            :hint="data.hint"
            :suffix="data.suffix" />
    </GridTableCell>
</template>
<script>
import { mapState } from 'vuex';
import { cellDataCompose } from '@Core/models/mappers/gridDataMapper';
import GridHintPresentationCell from '@Core/components/Grid/Layout/Table/Cells/Presentation/GridHintPresentationCell';
import gridDataCellMixin from '@Core/mixins/grid/cell/gridDataCellMixin';

export default {
    name: 'GridTextHintDataCell',
    components: {
        GridHintPresentationCell,
    },
    mixins: [gridDataCellMixin],
    computed: {
        ...mapState('grid', {
            drafts: state => state.drafts,
        }),
        cellData() {
            const check = (data, draftValue) => data !== draftValue;
            const getMappedValue = cellDataCompose(check);

            return getMappedValue(this.data.value, this.drafts[this.rowId], this.columnId);
        },
    },
};
</script>
