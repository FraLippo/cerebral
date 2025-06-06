using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactCoreCerebral.Models
{
    public class TableauContext : DbContext
    {
        public TableauContext(DbContextOptions<TableauContext> options)
           : base(options)
        {
        }

        public DbSet<Resultat2019> Resultat2019 { get; set; }
        public DbSet<ReponseIA> ReponseIA { get; set; }

    }
}
