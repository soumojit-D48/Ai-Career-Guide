import { Briefcase, MapPin, Clock, ExternalLink } from 'lucide-react';

export function OpportunityCard({ opportunity }) {
  const isJob = opportunity.type === 'job';

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft hover:shadow-glow transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              isJob
                ? 'bg-primary/10 text-primary'
                : 'bg-secondary/10 text-secondary'
            }`}>
              {isJob ? 'Job' : 'Internship'}
            </span>
          </div>
          <h3 className="text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors">
            {opportunity.title}
          </h3>
          <p className="text-lg text-muted-foreground mt-1">{opportunity.company}</p>
        </div>
        <Briefcase className="w-8 h-8 text-muted-foreground shrink-0" />
      </div>

      <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span>{opportunity.location}</span>
        </div>
        {opportunity.salary_range && (
          <div className="flex items-center gap-1 font-medium text-accent">
            <span>{opportunity.salary_range}</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{new Date(opportunity.posted_date).toLocaleDateString()}</span>
        </div>
      </div>

      <p className="text-card-foreground mb-4 line-clamp-3">
        {opportunity.description}
      </p>

      {opportunity.requirements && opportunity.requirements.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-card-foreground mb-2">Requirements:</h4>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            {opportunity.requirements.slice(0, 3).map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
      )}

      <a
        href={opportunity.application_url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:shadow-glow transition-all duration-300 font-medium group-hover:gap-3"
      >
        Apply Now
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );
}
