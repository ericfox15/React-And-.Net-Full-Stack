using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Activities.Commands
{
    public class DeleteActivity
    {
        public class Command : IRequest
        {
            public required string Id { get; set; }
        }

        public class Handler(AppDbContext context) : IRequestHandler<Command>
        {

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities.FindAsync([request.Id], cancellationToken) ?? throw new KeyNotFoundException($"Activity with ID {request.Id} not found.");
                context.Remove(activity);
                await context.SaveChangesAsync(cancellationToken);            
            }
        }
    }
}
              