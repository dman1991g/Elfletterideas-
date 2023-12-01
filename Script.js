// This is the custom JavaScript file

// Define a global variable to store the data from the web scraping library
var data = [];

// Define a function to fetch and parse the data from the web source using Axios and Cheerio
function fetchData() {
    // Use Axios to make a GET request to the web source
    axios.get("https://www.thequintessentialmommy.com/the-ultimate-elf-on-the-shelf-ideas-planner/")
        .then(function (response) {
            // Use Cheerio to load the HTML response
            var $ = cheerio.load(response.data);
            // Use Cheerio to find and loop through the elements that contain the elf on the shelf ideas
            $(".entry-content ul li").each(function (index, element) {
                // Use Cheerio to extract the text and the image from each element
                var text = $(element).text();
                var image = $(element).find("img").attr("src");
                // Use a regular expression to split the text into the theme, the difficulty, and the description
                var regex = /Theme: (.+) Difficulty: (.+) Description: (.+)/;
                var match = text.match(regex);
                // If the text matches the regular expression, create an object with the theme, the difficulty, the description, the image, and the source link
                if (match) {
                    var idea = {
                        theme: match[1],
                        difficulty: match[2],
                        description: match[3],
                        image: image,
                        source: "https://www.thequintessentialmommy.com/the-ultimate-elf-on-the-shelf-ideas-planner/"
                    };
                    // Push the object to the data array
                    data.push(idea);
                }
            });
            // Log the data array to the console
            console.log(data);
        })
        .catch(function (error) {
            // Log the error to the console
            console.error(error);
        });
}

// Define a function to display the data using Handlebars template
function displayData(idea) {
    // Use jQuery to select the result div
    var result = $("#result");
    // Use jQuery to empty the result div
    result.empty();
    // Use jQuery to select the script tag that contains the Handlebars template
    var source = $("#template").html();
    // Use Handlebars to compile the template
    var template = Handlebars.compile(source);
    // Use Handlebars to render the template with the data
    var html = template(idea);
    // Use jQuery to append the rendered HTML to the result div
    result.append(html);
}

// Define a function to search the data based on the user's input
function searchData() {
    // Use jQuery to select the form elements and get their values
    var theme = $("#theme").val();
    var difficulty = $("#difficulty").val();
    var date = $("#date").val();
    var rating = $("#rating").val();
    // Define a variable to store the filtered data
    var filteredData = [];
    // Loop through the data array and check if each idea matches the user's input
    for (var i = 0; i < data.length; i++) {
        var idea = data[i];
        // If the user's input is empty or matches the idea's theme, difficulty, date, or rating, push the idea to the filtered data array
        if ((theme === "" || idea.theme === theme) && (difficulty === "" || idea.difficulty === difficulty) && (date === "" || idea.date ===
