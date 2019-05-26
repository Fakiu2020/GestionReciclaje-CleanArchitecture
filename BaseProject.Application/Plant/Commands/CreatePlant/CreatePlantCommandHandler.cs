﻿using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using BaseProject.Application.Plant.CreatePlant;
using BaseProject.Domain;
using BaseProject.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Whoever.Common.Exceptions;
using Whoever.Common.Extensions;

namespace BaseProject.Application.Plant.CreatePlant
{
    public class CreatePlantCommandHandler : IRequestHandler<CreatePlantCommand, bool>
    {
        private readonly BaseProjectDbContext _context;
        private readonly IMapper _mapper;

        public CreatePlantCommandHandler(BaseProjectDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<bool> Handle(CreatePlantCommand request, CancellationToken cancellationToken)
        {

            var plant = new BaseProject.Domain.Plant.Plant() {
                Address = request.Address,
                Name = request.Name,
                MunicipioId = request.MunicipioId
            };


            try
            {

                var result = await _context.Plants.AddAsync(plant);

                await _context.SaveChangesAsync(cancellationToken);
                return true;
            }
            catch (Exception ex)
            {
                ex.ReThrow();
                return false;
            }
        }
    }
}