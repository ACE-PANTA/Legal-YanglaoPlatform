export interface HealthInformationRequest
{
    bloodType:string,
    limbMobility:string,
    limbDisability:string,
    medicalHistory:string,
    recordDisease:string,
    isLongTermMedication:string,
    majorDiseases:string,
    healthStatus:string,
    disabilityLevel:string,
    disabilityType:string,
    remark:string
}

export interface SocialSecurityRequest
{
    medicalInsurance:string,
    pensionInsurance:string,
    housingFund:string,
    lowIncomeSupport:string,
    insurance:string,
    fiveGuaranteesSupport:string,
    otherBenefits:string,
    employmentSupport:string
}

export interface EnrollHouseHoldSpouseRequests
{
    relation:string,
    name:string,
    photo:string,
    identificationNumber:string,
    householdRegistLocation:string,
    gender:string,
    birthDate:string,
    ethnicity:string,
    region:string,
    politicalAffiliation:string,
    maritalStatus:string,
    educationLevel:string,
    phoneNumber:string,
    administrativeDivision:string,
    employerSchool:string,
    employmentStatus:string,
    remark:string,
    grading:string,
    healthInformationRequest:HealthInformationRequest,
    socialSecurityRequest:SocialSecurityRequest
}

export interface EnrollChildGrandRequest
{
    name:string,
    relation:string,
    ifAdopt:string,
    gender:string,
    birthDate:string,
    healthStatus:string,
    takecareLifeAbility:string,
    ifLivingAlone:string,
    disabilityType:string,
    disabilityLevel:string,
    medicalDependence:string,
    ifChronicDisease:string,
    chronicDiseaseName:string,
    commonlyMedications:string,
    grading:string,
    remark:string
}


export interface BasicInfTemplate{
    grading:string,
    annualIncome:string,
    annualExpenditure:string,
    provinceId: string,
    provinceName: string,
    municipalityId: string,
    municipalityName: string,
    districtId: string,
    districtName:string,
    townshipStreetsId: string,
    townshipStreetsName: string,
    Remark: string,
    ListEnrollHouseHoldSpouseRequest:Array<EnrollHouseHoldSpouseRequests>,
    ListEnrollChildGrandRequest:Array<EnrollChildGrandRequest>,
}