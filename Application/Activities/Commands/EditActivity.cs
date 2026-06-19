using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;

namespace Application.Activities.Commands
{
    public class EditActivity
    {
        public class Command : IRequest
        {
            public required Activity Activity { get; set; }
        }

        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command>
        {

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities.FindAsync([request.Activity.Id], cancellationToken) ?? throw new KeyNotFoundException($"Activity with ID {request.Activity.Id} not found.");

                // Update the activity properties
                mapper.Map(request.Activity, activity);

                await context.SaveChangesAsync(cancellationToken);            
            }
        }
    }
}
              