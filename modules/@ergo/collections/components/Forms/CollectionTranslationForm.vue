/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Card :title="selectedLanguage">
        <Form :fields-keys="[descriptionKeyField, nameKeyField]">
            <template #body="{ errorMessages }">
                <FormSection>
                    <TextField
                        :value="translations.name[languageCode]"
                        solid
                        regular
                        label="Product collection name"
                        :disabled="!isUserAllowedToUpdate"
                        :error-messages="errorMessages[nameKeyField]"
                        @input="(value) => setTranslationPropertyValue(value, 'name')" />
                    <TextArea
                        :value="translations.description[languageCode]"
                        solid
                        label="Description"
                        resize="vertical"
                        :style="{height: '150px'}"
                        :error-messages="errorMessages[descriptionKeyField]"
                        :disabled="!isUserAllowedToUpdate"
                        @input="(value) => setTranslationPropertyValue(value, 'description')" />
                </FormSection>
            </template>
        </Form>
    </Card>
</template>

<script>
import translationCardMixin from '@Core/mixins/card/translationCardMixin';
import TextField from '@Core/components/Inputs/TextField';
import TextArea from '@Core/components/Inputs/TextArea';
import Card from '@Core/components/Card/Card';
import Form from '@Core/components/Form/Form';
import FormSection from '@Core/components/Form/FormSection';

export default {
    name: 'CollectionTranslationForm',
    components: {
        FormSection,
        Form,
        Card,
        TextArea,
        TextField,
    },
    mixins: [translationCardMixin],
    computed: {
        isUserAllowedToUpdate() {
            return this.$hasAccess(['PRODUCT_COLLECTION_UPDATE']);
        },
        descriptionKeyField() {
            return `description_${this.languageCode}`;
        },
        nameKeyField() {
            return `name_${this.languageCode}`;
        },
    },
};
</script>
