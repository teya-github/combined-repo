using System.ComponentModel.DataAnnotations;

namespace StatusCodes.API.Models
{
    public class Status
    {
        [Key] //suggesting that this is the PK of this table
        public bool StatusId { get; set; }
        public string Description { get; set; }
    }
}
