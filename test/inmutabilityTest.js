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

        function addUser(list, user) {
            return list.push(user);
        }

        test('if a list changes its state should create another list with the changed state', ()=> {
            let list = List.of('user1', 'user4');
            let nextState = addUser(list, 'user3');

            assert.equal(nextState, List.of('user1', 'user4', 'user3'));
            assert.equal(list, List.of('user1', 'user4'));
        });

        test('indexOf should return the correct index of an item in a list', ()=> {
            let list = List.of('user1', 'user4', 'user5', 'user88');
            let actual = list.indexOf('user5');
            assert.equal(actual, 2);
        });

        test('indexOf should return the correct index of an item in a list with repeated items', ()=> {
            let list = List.of('user1', 'user4', 'user5', 'user88', 'user5', 'user99');
            let actual = list.indexOf('user5');
            assert.equal(actual, 2);
        });

        test('remove an item of a list should create another list with the element removed', ()=> {
            let list = List.of('user1', 'user4', 'user5', 'user88');
            let nextState = list.remove(list.indexOf('user5'));

            assert.equal(nextState, List.of('user1', 'user4', 'user88'));
            assert.equal(list, List.of('user1', 'user4', 'user5', 'user88'));
        });
    });

    suite('tree', () => {

        function removeGuestUser(currentState, user) {
            if (currentState.get('guest')) {
                let guestIndex = currentState.get('guest').indexOf(user);
                if (guestIndex !== -1) {
                    return currentState.set('guest', currentState.get('guest').remove(guestIndex));
                }
            }

            return currentState;
        }


        function addRegisteredUser(currentState, user) {
            return currentState.set('registered',
                currentState.get('registered').push(user)
            );
        }

        test('add registered user should add to registered user list', () => {
            let state = Map({
                registered: List.of('USER1', 'USER2', 'USER3')
            });
            let nextState = addRegisteredUser(state, 'USER77');

            assert.equal(nextState, Map({
                registered: List.of('USER1', 'USER2', 'USER3', 'USER77')
            }));
            assert.equal(state, Map({
                registered: List.of('USER1', 'USER2', 'USER3')
            }));
        });

        test('add registered user should remove from guest user list first', () => {
            let state = Map({
                registered: List.of('USER1', 'USER2', 'USER3'),
                guest: List.of('USER99', 'USER221', 'USER304')
            });
            let nextState = addRegisteredUser(removeGuestUser(state, 'USER304'), 'USER304');

            assert.equal(nextState, Map({
                registered: List.of('USER1', 'USER2', 'USER3', 'USER304'),
                guest: List.of('USER99', 'USER221')
            }));
        });


    });

});