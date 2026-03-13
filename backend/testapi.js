const axios = require("axios")

async function testAPI() {

    try {

        const response = await axios.post(
            "http://localhost:5000/api/recommend",
            {
                ingredients: "tomato onion garlic"
            }
        )

        console.log("Response from backend:")
        console.log(response.data)

    } catch (err) {

        console.error("Error:")
        console.log(err.response?.data || err.message)

    }

}

testAPI()