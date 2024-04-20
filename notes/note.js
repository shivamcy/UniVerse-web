// Simulated data for demonstration
const topicsData = {
    "Topic 1": "Data for Topic 1",
    "Topic 2": "Data for Topic 2",
    "Topic 3": "Data for Topic 3"
};

// Function to display data for a given topic
function displayTopicData(topic) {
    document.getElementById('topicHeader').innerText = topic;
    document.getElementById('dataContent').innerText = topicsData[topic];
}

// Function to handle button click event
document.getElementById('uploadBtn').addEventListener('click', function() {
    // Implement your upload functionality here
    alert('Upload functionality not implemented yet!');
});

// Initial display with default topic
displayTopicData("Topic 1");
