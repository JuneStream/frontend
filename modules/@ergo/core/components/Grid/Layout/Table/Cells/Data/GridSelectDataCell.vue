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
        <template #default="{ isEditing }">
            <GridSelectEditCell
                v-if="isEditing"
                :value="cellData.value"
                :language-code="languageCode"
                :options="options"
                :width="$el.offsetWidth"
                :height="$el.offsetHeight"
                @input="onValueChange" />
            <GridSelectPresentationCell
                v-else-if="!isEditing && cellData.value"
                :value="cellData.value"
                :suffix="data.suffix"
                :options="options" />
        </template>
    </GridTableCell>
</template>

<script>
import { mapState } from 'vuex';
import { cellDataCompose } from '@Core/models/mappers/gridDataMapper';
import GridSelectPresentationCell from '@Core/components/Grid/Layout/Table/Cells/Presentation/GridSelectPresentationCell';
import gridDataCellMixin from '@Core/mixins/grid/cell/gridDataCellMixin';

export default {
    name: 'GridSelectDataCell',
    components: {
        GridSelectPresentationCell,
        GridSelectEditCell: () => import('@Core/components/Grid/Layout/Table/Cells/Edit/GridSelectEditCell'),
    },
    mixins: [gridDataCellMixin],
    props: {
        languageCode: {
            type: String,
            default: 'EN',
        },
        options: {
            type: Object,
            default: () => ({}),
        },
    },
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
