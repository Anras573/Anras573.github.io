namespace PageGenerator.Models
{
    public static class ExperienceList
    {
        public static IEnumerable<Experience> GetExperiences()
        {
            yield return new Experience("DFDS A/S", "Backend Developer", "Oct. 2021 - present");
            yield return new Experience("Hesehus A/S", "Software Developer", "Aug. 2019 - Sep. 2021");
            yield return new Experience("Itera Denmark A/S", "Fullstack Developer", "Aug. 2018 - Jul. 2019");
            yield return new Experience("Sigma Estimates A/S", "Software Developer", "Jun. 2017 - Jul. 2018");
            yield return new Experience("ALD Automotive A/S", "IT Developer", "Sep. 2016 - Jun. 2017");
            yield return new Experience("Autobutler A/S", "Junior Software Developer", "Jul. 2014 - Sep. 2016");
        }
    }

    public record Experience(string Company, string JobTitle, string TimeSpan);
}
