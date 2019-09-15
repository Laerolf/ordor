import io from "socket.io-client";
import comparator from "@/plugins/comparator"

const socket = io("http://192.168.1.59:8282");

socket.on("databaseUpdate", async (updatedState) => {
const feedback = await comparator.compareStates(updatedState);

if (feedback.result.amountOfDifferences > 0){
    console.log('SOMETHING CHANGED IN THE DATABASE', feedback);
}

})
