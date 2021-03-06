/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        title="General"
        :fields-keys="[nameFieldKey]">
        <template #body="{ errorMessages }">
            <FormSection>
                <TextField
                    :value="templateTitle"
                    solid
                    required
                    regular
                    :error-messages="errorMessages[nameFieldKey]"
                    label="Template name"
                    :disabled="isDisabledByPrivileges"
                    @input="setTitle" />
                <UploadImageFile
                    :value="templateImage"
                    label="Template cover image"
                    :disabled="isDisabledByPrivileges"
                    @upload="setImage"
                    @remove="setImage" />
            </FormSection>
            <FormSection title="Presentation product">
                <TranslationSelect
                    :value="defaultTextAttribute"
                    solid
                    regular
                    required
                    label="Default label attribute"
                    :options="textAttributesOptions"
                    @input="setDefaultTextAttribute" />
                <TranslationSelect
                    :value="defaultImageAttribute"
                    solid
                    regular
                    clearable
                    label="Default image attribute"
                    :options="imageAttributesOptions"
                    @input="setDefaultImageAttribute" />
            </FormSection>
        </template>
    </Form>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'TemplateDesignerForm',
    components: {
        Form: () => import('@Core/components/Form/Form'),
        FormSection: () => import('@Core/components/Form/FormSection'),
        TextField: () => import('@Core/components/Inputs/TextField'),
        TranslationSelect: () => import('@Core/components/Inputs/Select/TranslationSelect'),
        UploadImageFile: () => import('@Core/components/Inputs/UploadFile/UploadImageFile'),
    },
    computed: {
        ...mapState('templateDesigner', {
            templateTitle: state => state.title,
            templateImage: state => state.image,
            defaultTextAttribute: state => state.defaultTextAttribute,
            defaultImageAttribute: state => state.defaultImageAttribute,
            textAttributesOptions: state => state.textAttributesOptions,
            imageAttributesOptions: state => state.imageAttributesOptions,
        }),
        isDisabled() {
            return Boolean(this.templateTitle);
        },
        isDisabledByPrivileges() {
            return (this.isDisabled && !this.$hasAccess(['TEMPLATE_DESIGNER_UPDATE']))
                || (!this.isDisabled && !this.$hasAccess(['TEMPLATE_DESIGNER_CREATE']));
        },
        nameFieldKey() {
            return 'name';
        },
    },
    methods: {
        ...mapActions('templateDesigner', [
            'setTitle',
            'setImage',
            'setDefaultImageAttribute',
            'setDefaultTextAttribute',
        ]),
    },
};
</script>
