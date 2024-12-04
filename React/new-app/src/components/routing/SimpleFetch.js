import React, { useState, useEffect } from "react";

const FetchDataComponent = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://contactlist.us-east-1.elasticbeanstalk.com/contacts')
                if(!response.ok) {
                    throw new Error('network was NOT OK')
                }
                const result = await response.json()
                setData(result)
                console.log(result)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()

    }, [])

    if(loading) {
        return <div>Loading... </div>
    }

    if(error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <div>
            <h2>Fetched Data</h2>
            <div>
                {JSON.stringify(data, null, 2)}
            </div>
        </div>
    )

}

export default FetchDataComponent
