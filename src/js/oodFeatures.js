const oodFeatures = {
    withinOpenDate(startDate, endDate) {
        const today = new Date()

        if (!startDate || !endDate)
            return true
        
        if (today >= new Date(startDate) && today <= new Date(endDate))
            return true
        
        return false
    }
}

export default oodFeatures