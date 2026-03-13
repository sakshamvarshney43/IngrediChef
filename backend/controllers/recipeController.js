const axios = require("axios")

exports.recommend = async (req, res) => {

    console.log("BODY:", req.body)

    const ingredients = req.body?.ingredients

    if (!ingredients) {
        return res.status(400).json({
            error: "Ingredients missing in request"
        })
    }

    try {

        const response = await axios.post(
            "http://localhost:8000/recommend",
            { ingredients }
        )

        res.json(response.data)

    } catch (err) {

        console.error("FASTAPI ERROR:", err.response?.data || err)

        res.status(500).json({
            error: err.response?.data || "Recommendation failed"
        })
    }
}