import _ from "lodash";
import store from '@/store'

export default {
    compareStates: async function (data) {
        const currentState = _.cloneDeep(store.getters.getVenue);
        const updatedState = _.cloneDeep(data);

        delete updatedState._class;

        let feedback = {
            amountOfDifferences: 0,
            differences: []
        };

        const comparisonCategories = {
            notEqual: {active: true, label: 'adjusted'},
            missing: {active: true, label: 'new'}
        };

        const reversedComparisonCategories = {
            notEqual: {active: false, label: 'adjusted'},
            missing: {active: true, label: 'deleted'}
        };

        try {

            if (currentState._id === updatedState._id) {

                feedback = await compareObjects(currentState, updatedState, feedback, comparisonCategories);
                feedback = await compareObjects(updatedState, currentState, feedback.result, reversedComparisonCategories);

            } else {
                throw new Error(`States don't match _id's`)
            }

        } catch (exception) {
            console.warn(`Comparison of states failed: ${exception}.`);
        }

        feedback.result.path = evaluatePath(feedback.result.path);

        return feedback;
    }
}

async function compareObjects(objectOne, objectTwo, feedback, comparisonCategories) {

    const path = {};
    return await traverseObject(objectOne, objectTwo, feedback, comparisonCategories, undefined, path);

}

function traverseObject(objectOne, objectTwo, feedback, comparisonCategories, parent, path) {
    return new Promise((resolve, reject) => {

        for (let [key, valueObjectTwo] of Object.entries(objectTwo)) {
            path[key] = {};
            if (objectOne.hasOwnProperty(key)) {
                const valueObjectOne = objectOne[key];

                if (typeof valueObjectTwo === 'object') {
                    traverseObject(valueObjectOne, valueObjectTwo, feedback, comparisonCategories, key, path[key]);
                } else {
                    if (comparisonCategories.notEqual.active && valueObjectTwo !== valueObjectOne) {
                        if (Date.parse(valueObjectTwo) !== Date.parse(valueObjectOne)) {
                            path[key] = comparisonCategories.notEqual.label;
                            feedback.differences.push({
                                category: comparisonCategories.notEqual.label,
                                name: key,
                                content: valueObjectTwo,
                                parent: parent
                            });
                            feedback.amountOfDifferences = feedback.differences.length;
                        }
                    }
                }

            } else {
                if (comparisonCategories.missing.active && valueObjectTwo !== undefined && valueObjectTwo !== null) {
                    path[key] = comparisonCategories.missing.label;
                    feedback.differences.push({
                        category: comparisonCategories.missing.label,
                        name: key,
                        content: valueObjectTwo,
                        parent: parent
                    });
                    feedback.amountOfDifferences = feedback.differences.length;
                }
            }

        }

        resolve({result: feedback, path: path});
    })
}

function evaluatePath(object) {

    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            if (object[key] && typeof object[key] === "object") {
                let result = evaluatePath(object[key]);
                if (result) {
                    result.unshift(key);
                    return result;
                }
            } else if (object[key] !== undefined) {
                return [key];
            }
        }
    }
}
