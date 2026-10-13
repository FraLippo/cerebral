using Microsoft.AspNetCore.Mvc;

namespace ReactCoreCerebral.Controllers
{
    public class TestController : Controller
    {
        [HttpGet("/test")]
        public IActionResult Index()
        {
            return Content("ASP.NET Core fonctionne");
        }
    }
}
