/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ProductTemplateFormField
        :size="size"
        :position="position">
        <FormValidatorField :field-key="fieldKey">
            <template #validator="{ errorMessages }">
                <TranslationSelect
                    :value="fieldData.value"
                    solid
                    regular
                    :clearable="true"
                    :multiselect="true"
                    :label="label"
                    :options="options"
                    :placeholder="properties.placeholder"
                    :error-messages="errorMessages"
                    :is-information-label="false"
                    :required="properties.required"
                    :disabled="disabled"
                    :description="properties.hint"
                    @input="debounceValueChange" />
            </template>
        </FormValidatorField>
    </ProductTemplateFormField>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { debounce } from 'debounce';
import { fieldDataCompose } from '@Products/models/productMapper';
import { arraysAreEqual } from '@Core/models/arrayWrapper';
import ProductTemplateFormField from '@Products/components/Forms/Fields/ProductTemplateFormField';
import TranslationSelect from '@Core/components/Inputs/Select/TranslationSelect';
import FormValidatorField from '@Core/components/Form/Field/FormValidatorField';
import { getMappedMatchedArrayOptions, getMappedObjectOptions } from '@Core/models/mappers/translationsMapper';

export default {
    name: 'ProductTemplateFormMultiSelectField',
    components: {
        ProductTemplateFormField,
        TranslationSelect,
        FormValidatorField,
    },
    props: {
        size: {
            type: Object,
            default: () => ({}),
        },
        position: {
            type: Object,
            default: () => ({}),
        },
        parameters: {
            type: Object,
            default: () => ({}),
        },
        properties: {
            type: Object,
            default: () => ({}),
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        label: {
            type: String,
            default: '',
        },
        languageCode: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            debounceValueChange: null,
        };
    },
    computed: {
        ...mapState('product', {
            data: state => state.data,
            draft: state => state.draft,
        }),
        fieldKey() {
            return `${this.properties.attribute_code}/${this.languageCode}`;
        },
        hasOptions() {
            return typeof this.properties.options !== 'undefined';
        },
        options() {
            if (!this.hasOptions) return [];

            return getMappedObjectOptions({
                options: this.properties.options,
                languageCode: this.languageCode,
            });
        },
        fieldData() {
            if (!this.hasOptions) {
                return {
                    value: null,
                    isDraft: false,
                };
            }

            const { attribute_code } = this.properties;
            const check = (data, draftValue) => !arraysAreEqual(data, draftValue);
            const getMappedValue = fieldDataCompose(check);
            const { isDraft, value } = getMappedValue({
                data: this.data[attribute_code],
                draft: this.draft[this.languageCode][attribute_code],
                defaultValue: [],
            });

            return {
                isDraft,
                value: getMappedMatchedArrayOptions({
                    optionIds: value,
                    options: this.properties.options,
                    languageCode: this.languageCode,
                }),
            };
        },
    },
    created() {
        this.debounceValueChange = debounce(value => this.onValueChange(value));
    },
    methods: {
        ...mapActions('product', [
            'setDraftValue',
        ]),
        onValueChange(value) {
            const ids = value.map(({ id }) => id);

            this.setDraftValue({
                languageCode: this.languageCode,
                key: this.properties.attribute_code,
                value: ids,
            });

            this.$emit('input', {
                fieldKey: this.fieldKey,
                languageCode: this.languageCode,
                productId: this.$route.params.id,
                elementId: this.properties.attribute_id,
                value: ids,
            });
        },
    },
};
</script>
