﻿using System;
using System.Collections.Generic;
using System.Text;
using Whoever.Entities;
using Whoever.Entities.Interfaces;

namespace BaseProject.Domain.Plant
{
    public class Plant : IHasCreationTime, ISoftDelete
    {
        public Guid PlantId { get; set; }
        public string Name{ get; set; }
        public string Address{ get; set; }
        public DateTime CreationTime { get; set; }
        public bool IsDeleted { get; set; }

        public Guid MunicipioId { get; set; }
        public virtual Municipio Municipio { get; set; }
}
}