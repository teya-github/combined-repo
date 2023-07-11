using System.ComponentModel.DataAnnotations;

namespace Cards.API.Models
{
    public class Card
    {
        [Key] //suggesting that this is the PK of this table
        public Guid Id { get; set; }
        public string CardholderName { get; set; }
        public string CardNumber { get; set; }
        public int ExpiryMonth { get; set; }
        public int ExpiryYear { get; set; }
        public int CVC { get; set; }
        /*public String Gender { get; set; }*/


    }
}
