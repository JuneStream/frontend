/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'FormValidatorField',
    props: {
        fieldKey: {
            type: [String, Number],
            required: true,
        },
    },
    computed: {
        ...mapState('validations', {
            validationErrors: state => state.validationErrors,
        }),
        errorMessages() {
            return this.validationErrors[this.fieldKey];
        },
    },
    beforeDestroy() {
        this.removeValidationError(this.fieldKey);
    },
    methods: {
        ...mapActions('validations', [
            'removeValidationError',
        ]),
    },
    render() {
        return this.$scopedSlots.validator({
            errorMessages: this.errorMessages,
        });
    },
};
</script>
