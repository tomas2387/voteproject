import {assert} from 'chai';
import {List, Map} from 'immutable';

suite('immutability test', () => {

    suite('numbers', () => {

        function increment(n) {
            return n + 1;
        }

        test('if a number changes its state should not use the same reference', () => {
            let state = 42;
            let nextState = increment(state);

            assert.equal(state, 42);
            assert.equal(nextState, 43);
        });

    });

    suite('lists', () => {

        function addAcessPointName(list, apName) {
            return list.push(apName);
        }

        test('if a list changes its state should create another list with the changed state', ()=> {
            let list = List.of('apName1', 'apName4');
            let nextState = addAcessPointName(list, 'apName3');

            assert.equal(nextState, List.of('apName1', 'apName4', 'apName3'));
            assert.equal(list, List.of('apName1', 'apName4'));
        });

        test('indexOf should return the correct index of an item in a list', ()=> {
            let list = List.of('apName1', 'apName4', 'apName5', 'apName88');
            let actual = list.indexOf('apName5');
            assert.equal(actual, 2);
        });

        test('indexOf should return the correct index of an item in a list with repeated items', ()=> {
            let list = List.of('apName1', 'apName4', 'apName5', 'apName88', 'apName5', 'apName99');
            let actual = list.indexOf('apName5');
            assert.equal(actual, 2);
        });

        test('remove an item of a list should create another list with the element removed', ()=> {
            let list = List.of('apName1', 'apName4', 'apName5', 'apName88');
            let nextState = list.remove(list.indexOf('apName5'));

            assert.equal(nextState, List.of('apName1', 'apName4', 'apName88'));
            assert.equal(list, List.of('apName1', 'apName4', 'apName5', 'apName88'));
        });
    });

    suite('tree', () => {

        function removeGuestAcessPointName(currentState, apName) {
            if (currentState.get('guest')) {
                let guestIndex = currentState.get('guest').indexOf(apName);
                if (guestIndex !== -1) {
                    return currentState.set('guest', currentState.get('guest').remove(guestIndex));
                }
            }

            return currentState;
        }


        function addRegisteredAcessPointName(currentState, apName) {
            return currentState.set('registered',
                currentState.get('registered').push(apName)
            );
        }

        test('add registered apName should add to registered apName list', () => {
            let state = Map({
                registered: List.of('APNAME1', 'APNAME2', 'APNAME3')
            });
            let nextState = addRegisteredAcessPointName(state, 'APNAME77');

            assert.equal(nextState, Map({
                registered: List.of('APNAME1', 'APNAME2', 'APNAME3', 'APNAME77')
            }));
            assert.equal(state, Map({
                registered: List.of('APNAME1', 'APNAME2', 'APNAME3')
            }));
        });

        test('add registered apName should remove from guest apName list first', () => {
            let state = Map({
                registered: List.of('APNAME1', 'APNAME2', 'APNAME3'),
                guest: List.of('APNAME99', 'APNAME221', 'APNAME304')
            });
            let nextState = addRegisteredAcessPointName(removeGuestAcessPointName(state, 'APNAME304'), 'APNAME304');

            assert.equal(nextState, Map({
                registered: List.of('APNAME1', 'APNAME2', 'APNAME3', 'APNAME304'),
                guest: List.of('APNAME99', 'APNAME221')
            }));
        });
    });
});
