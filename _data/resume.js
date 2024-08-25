const eleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function() {
    const url = "https://raw.githubusercontent.com/Anras573/json-resume/main/resume.json";
    const response = await eleventyFetch(url, {
        duration: "1d",
        type: "json"
    });

    return response;
}