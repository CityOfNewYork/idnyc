const oodFeatureList = []

const oodFeatures = {
    withinOpenDate(startDate, endDate) {
         const today = new Date()

        if (!startDate || !endDate)
            return true
        
        if (today >= new Date(startDate) && today <= new Date(endDate))
            return true
        
        return false
    },
    getOodList() {
        return oodFeatureList
    },
    checkStatus(feature) {
        if (!this.withinOpenDate(feature.getStartDate(), feature.getEndDate()))
            oodFeatureList.push(feature)
    }
}

export default oodFeatures