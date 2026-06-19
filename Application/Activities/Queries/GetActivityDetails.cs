using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Activities.Queries
{
    public class GetActivityDetails
    {
        public class Query : IRequest<Activity>
        {
            public required string Id { get; set; }
        }

        public class Handler(AppDbContext context) : IRequestHandler<Query, Activity>
        {

            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities.FindAsync([request.Id ], cancellationToken);
                if (activity == null)
                {
                    throw new KeyNotFoundException($"Activity with ID {request.Id} not found.");
                }
                return activity;
            }
        }
    }
}
