import eleventyFetch from "@11ty/eleventy-fetch";

export default async function() {
    const url = "https://raw.githubusercontent.com/Anras573/json-resume/main/resume.json";
    
    try {
        const response = await eleventyFetch(url, {
            duration: "1d",
            type: "json"
        });
        return response;
    } catch (error) {
        console.error("Failed to fetch resume data:", error);
        console.error("Using minimal fallback data. Please check network connectivity.");
        // Return minimal fallback data to prevent build failure
        // Note: Update these values if personal information changes
        return {
            basics: {
                name: "Anders Bo Rasmussen",
                label: "Senior Software Engineer",
                image: "",
                summary: "Resume data temporarily unavailable. Please try again later.",
                location: { city: "Sorø", countryCode: "DK" },
                profiles: [],
                email: "",
                url: ""
            },
            work: [],
            volunteer: [],
            education: [],
            skills: []
        };
    }
}