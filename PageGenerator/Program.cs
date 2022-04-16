// See https://aka.ms/new-console-template for more information
using Statiq.App;
using Statiq.Web;

Console.WriteLine("Hello, World!");

await Bootstrapper
    .Factory
    .CreateWeb(new[] { "preview" })
    .RunAsync();
