using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ConcidTest.Startup))]
namespace ConcidTest
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
