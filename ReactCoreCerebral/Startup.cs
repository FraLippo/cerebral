using CerebralCore.Donnees;
using CerebralCore.Hub;
using CerebralCore.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ReactCoreCerebral.Donnees;
using ReactCoreCerebral.Models;
using ReactCoreCerebral.Services;

namespace ReactCoreCerebral
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder.WithOrigins("https://brain-games.evalquiz.com", "http://localhost:5173")
                           .AllowAnyHeader()
                           .AllowAnyMethod();
                });
            });

            // Vos services existants...
            services.AddControllersWithViews();
            services.AddSingleton<IDictionnaire, Dictionnaire>();
            services.AddSingleton<IDictionaryEnglish, DictionaryEnglish>();
            services.AddHttpClient<OpenAiService>();
            services.AddDbContext<CerebralContext>(options =>
            options.UseSqlServer(Configuration.GetConnectionString("CerebralContext")));
            services.AddDbContext<TableauContext>(options =>
           options.UseSqlServer(Configuration.GetConnectionString("TableauContext")));

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseCors();
            app.UseRouting();
 
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
               
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
