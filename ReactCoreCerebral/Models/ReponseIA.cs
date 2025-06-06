using System;

namespace ReactCoreCerebral.Models
{
    public class ReponseIA
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string IdUser { get; set; }
        public int Score { get; set; }
        public string TexteIA { get; set; }
    }
}
