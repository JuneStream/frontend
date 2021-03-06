/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getMappedArrayOptions,
    getParsedType,
    getParsedParameterKeys,
} from '../attributeMapper';

describe('attributeMapper/getMappedArrayOptions', () => {
    describe('Based on API data, data is mapped into data structure', () => {
        it('Non multilingual attribute', () => {
            const apiData = [
                {
                    id: 1,
                    code: 'key1',
                    label: 'val1',
                },
                {
                    id: 2,
                    code: 'key2',
                    label: null,
                },
            ];
            const result = {
                0: { id: 1, key: 'key1', value: 'val1' },
                1: { id: 2, key: 'key2', value: null },
            };
            expect(getMappedArrayOptions(apiData)).toStrictEqual(result);
        });

        it('Multilingual attribute', () => {
            const apiData = [
                {
                    id: 1,
                    code: 'key1',
                    label: {
                        EN: 'val1',
                    },
                },
                {
                    id: 2,
                    code: 'key2',
                    label: null,
                },
            ];
            const result = {
                0: {
                    id: 1,
                    key: 'key1',
                    value: { EN: 'val1' },
                },
                1: {
                    id: 2,
                    key: 'key2',
                    value: null,
                },
            };
            expect(getMappedArrayOptions(apiData)).toStrictEqual(result);
        });
    });
});

describe('attributeMapper/getParsedParameterKeys', () => {
    describe('Based on attribute parameters data, data is mapped into API structure', () => {
        describe('Parsing parameter keys into key values data structure', () => {
            it('Selected parameters are an object', () => {
                const selectedType = 'PRICE';
                const selectedParam = 'Euro';
                const result = {
                    currency: 'Euro',
                };

                expect(getParsedParameterKeys({
                    selectedType,
                    selectedParam,
                })).toStrictEqual(result);
            });
        });
    });
});

describe('attributeMapper/getMappedParameterValues', () => {
    describe('Based on API data, data is mapped into data structure', () => {
        // const data = {
        //     imageFormats: {
        //         JPG: 'Jpg',
        //         PNG: 'Png',
        //         TIFF: 'Tiff',
        //     },
        //     currencies: {
        //         EURO: 'Euro',
        //         PLN: 'Zloty',
        //     },
        // };

        // TODO: Finish tests!!
        it('Selected parameters are array', () => {
            // const type = 'IMAGE';
            // const param = ['JPG', 'PNG'];
            // const result = ['Jpg', 'Png'];
            //
            // expect(getMappedParameterValues(type, param, data)).toStrictEqual(result);
        });

        it('Selected parameter is an object', () => {
            // const type = 'PRICE';
            // const param = 'EURO';
            // const result = 'Euro';
            //
            // expect(getMappedParameterValues(type, param, data)).toStrictEqual(result);
        });
    });
});

describe('attributeMapper/getParsedType', () => {
    describe('Based on attribute types data, data is mapped into API structure', () => {
        it('Getting type object key based on his value', () => {
            const types = {
                TEXT: 'text',
                SELECT: 'select',
            };
            const selectedType = 'text';

            expect(getParsedType(types, selectedType)).toEqual('TEXT');
        });
    });
});
