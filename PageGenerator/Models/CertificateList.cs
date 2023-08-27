namespace PageGenerator.Models
{
    public static class CertificateList
    {
        private const string DoesntExpire = "No Expiration Date";
        public static IEnumerable<Certificate> GetCertificates()
        {
            yield return new Certificate("HTML5 Game Development Mini-Degree", "Zenva", "Sep. 2020", DoesntExpire, "https://academy.zenva.com/certificate/2739efb1/");
            yield return new Certificate("Algorithms and Efficiency", "SDU Karrierer og Kompetenceløft", "Nov. 2019", DoesntExpire, string.Empty);
            yield return new Certificate("Exam 532: Developing Microsoft Azure Solutions", "Microsoft", "Nov. 2018", DoesntExpire, "https://www.youracclaim.com/badges/bb4913dc-acb5-4f5a-bcc7-c99c27940741/linked_in_profile");
            yield return new Certificate("Google Cloud OnBoard();", "Google Cloud Europe", "Nov. 2017", DoesntExpire, string.Empty);
            yield return new Certificate("Ruby Programming for Beginners", "Udemy", "Mar. 2016", DoesntExpire, "http://ude.my/UC-0BO4PW8E");
        }
    }

    public record Certificate(string Title, string Issuer, string IssuedAt, string ExpiresAt, string CredentialsUrl);
}
