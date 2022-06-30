using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CerebralCore.Models
{
    public class CerebralContext : DbContext
    {
        public CerebralContext(DbContextOptions<CerebralContext> options)
            : base(options)
        {
        }

        public DbSet<Resultat> Resultats { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Resultat>().ToTable("Resultat");
        }
    }
}
