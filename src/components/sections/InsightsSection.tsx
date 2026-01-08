import { AIInsight } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { AlertTriangle, Lightbulb, AlertCircle, CheckCircle2, ArrowRight, Brain, Sparkles, MessageSquare, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';

const insightIcons = {
  critical: AlertCircle,
  warning: AlertTriangle,
  recommendation: Lightbulb,
  success: CheckCircle2,
};

const insightStyles = {
  critical: {
    border: 'border-l-destructive',
    icon: 'text-destructive bg-destructive/10',
    bg: 'bg-destructive/5',
  },
  warning: {
    border: 'border-l-warning',
    icon: 'text-warning bg-warning/10',
    bg: 'bg-warning/5',
  },
  recommendation: {
    border: 'border-l-primary',
    icon: 'text-primary bg-primary/10',
    bg: 'bg-primary/5',
  },
  success: {
    border: 'border-l-success',
    icon: 'text-success bg-success/10',
    bg: 'bg-success/5',
  },
};

interface InsightsSectionProps {
  insights: AIInsight[];
  studyData?: any; // Pass the full study data for usage in generation
}

const InsightsSection = ({ insights: initialInsights, studyData }: InsightsSectionProps) => {
  const [question, setQuestion] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [generatedResponse, setGeneratedResponse] = useState<any | null>(null);

  const sampleQuestions = [
    "Identify high-risk sites for data integrity",
    "Analyze backlog of MedDRA & WHODD coding",
    "Predict sites with highest dropout risk",
    "Summarize SAE reporting compliance",
  ];

  const handleAsk = (explicitQuestion?: string) => {
    const qToUse = explicitQuestion || question;
    if (!qToUse.trim()) return;

    setQuestion(qToUse);
    setIsTyping(true);
    setGeneratedResponse(null);

    // Simulate AI delay
    setTimeout(() => {
      setIsTyping(false);
      const q = qToUse.toLowerCase();

      // 1. DATA INTEGRITY / RISK ANALYSIS
      if (q.includes('integrity') || q.includes('high-risk') || q.includes('inconsistency')) {
        const criticalSites = studyData?.sites
          ?.filter((s: any) => s.dataQualityScore < 85 || s.openQueries > 12)
          .map((s: any) => ({
            name: s.name,
            issue: `Quality Score: ${s.dataQualityScore}%, Queries: ${s.openQueries}. Pattern of late data entry detected.`,
            severity: s.status === 'critical' ? 'critical' : 'warning'
          })) || [];

        setGeneratedResponse({
          title: "Advanced Data Integrity Risk Analysis",
          content: `Multi-variate risk assessment complete. I've detected ${criticalSites.length} sites where the relationship between visit frequency and query density suggests potential data integrity risks. Key factors include high deviation in mean time-to-entry and low query resolution velocity.`,
          items: criticalSites.length > 0 ? criticalSites : [
            { name: "Global Cohort", issue: "No high-risk integrity patterns detected across current sites.", severity: "success" }
          ]
        });
      }

      // 2. CODING BACKLOG
      else if (q.includes('coding') || q.includes('meddra') || q.includes('whodd')) {
        const avgUncoded = Math.floor(Math.random() * 15) + 5;
        const affectedSites = studyData?.sites?.slice(0, 3).map((s: any) => ({
          name: s.name,
          issue: `${Math.floor(Math.random() * 8) + 4} terms awaiting MedDRA 26.1 coding. Avg delay: 12 days.`,
          severity: 'warning'
        })) || [];

        setGeneratedResponse({
          title: "Global Coding Backlog Analysis",
          content: `Coding efficiency is currently at 82%. A backlog of approximately ${avgUncoded} terms per site has been identified. Most delays are concentrated in the Adverse Events (MedDRA) and Concomitant Medications (WHODD) modules. Recommend immediate medical review for unmapped verbatim terms.`,
          items: affectedSites
        });
      }

      // 3. DROPOUT RISK
      else if (q.includes('dropout') || q.includes('retention')) {
        const riskSites = studyData?.sites?.slice(0, 2).map((s: any) => ({
          name: s.name,
          issue: `Dropout risk index: 0.74. Contributing factors: high frequency of missed visits (V4-V6).`,
          severity: 'critical'
        })) || [];

        setGeneratedResponse({
          title: "Predictive Patient Retention Insights",
          content: "Using historical dropout markers, I've identified a rising risk profile for the 'Ongoing' cohort. Incomplete visits at Weeks 12 and 16 are the primary leading indicators of future discontinuations. Targeted site engagement is recommended for the following regions.",
          items: riskSites
        });
      }

      // 4. SAE COMPLIANCE
      else if (q.includes('sae') || q.includes('compliance')) {
        const saeIssues = studyData?.saeRecords
          ?.filter((r: any) => r.status === 'pending-review' || r.daysOpen > 7)
          .map((r: any) => ({
            name: `Subject ${r.subjectId}`,
            issue: `SAE report open for ${r.daysOpen} days. Awaiting ${r.severity === 'serious' ? 'Safety Lead' : 'DM'} verification.`,
            severity: r.severity === 'serious' ? 'critical' : 'warning'
          })) || [];

        setGeneratedResponse({
          title: "SAE Reporting & Regulatory Compliance",
          content: `Regulatory reporting window analysis: All SAEs must be reconciled within 24 hours of site notification. Currently, ${saeIssues.length} records are approaching or exceeding standard internal processing thresholds.`,
          items: saeIssues.length > 0 ? saeIssues : [{ name: "All Records", issue: "Full compliance with SAE reporting timelines achieved.", severity: "success" }]
        });
      }

      // GENERIC FALLBACK
      else {
        setGeneratedResponse({
          title: "AI Analysis Engine",
          content: "I've analyzed the study database but require a more specific query to generate deep insights. Please use one of the suggested prompts or ask about specific metrics like 'queries', 'coding', or 'SAEs'.",
          items: []
        });
      }
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* AI Assistant Header */}
      <div className="stat-card p-6 animate-fade-in gradient-primary text-white">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
            <Brain className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              AI-Powered Clinical Intelligence
              <Sparkles className="w-5 h-5" />
            </h2>
            <p className="text-white/80 text-sm mt-1">
              Real-time analysis and recommendations powered by advanced AI
            </p>
          </div>
        </div>

        {/* Question Input */}
        <div className="mt-6">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
              <Input
                placeholder="Ask about your trial data..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15"
              />
            </div>
            <Button onClick={() => handleAsk()} disabled={isTyping} className="bg-white text-primary hover:bg-white/90">
              {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="text-white/60 text-xs w-full mb-1">Suggested Prompts:</span>
            {sampleQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleAsk(q)}
                className="px-3 py-1.5 rounded-full bg-white/10 text-white/80 text-xs hover:bg-white/20 transition-colors border border-white/5"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Suggestions */}
      {!generatedResponse && !isTyping && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
          <div
            onClick={() => handleAsk("Identify high-risk sites for data integrity")}
            className="p-4 rounded-xl bg-card border border-primary/20 hover:border-primary/50 cursor-pointer group transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <AlertCircle className="w-4 h-4" />
              </div>
              <span className="font-semibold text-sm">Site Risk Analysis</span>
            </div>
            <p className="text-xs text-muted-foreground">Run a multi-variate analysis on site performance and data entry patterns to identify integrity risks.</p>
            <div className="mt-3 flex items-center text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              Run Analysis <ArrowRight className="w-3 h-3 ml-1" />
            </div>
          </div>
          <div
            onClick={() => handleAsk("Analyze backlog of MedDRA & WHODD coding")}
            className="p-4 rounded-xl bg-card border border-purple-500/20 hover:border-purple-500/50 cursor-pointer group transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-600">
                <Brain className="w-4 h-4" />
              </div>
              <span className="font-semibold text-sm">Coding Backlog Review</span>
            </div>
            <p className="text-xs text-muted-foreground">Review unmapped verbatim terms across all sites and identify bottlenecks in MedDRA/WHODD workflows.</p>
            <div className="mt-3 flex items-center text-xs text-purple-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              Run Analysis <ArrowRight className="w-3 h-3 ml-1" />
            </div>
          </div>
        </div>
      )}

      {/* Generated Response Area */}
      {generatedResponse && (
        <div className="stat-card p-6 animate-fade-in border-l-4 border-l-purple-500 bg-purple-50/50 dark:bg-purple-900/10">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            {generatedResponse.title}
          </h3>
          <p className="mt-2 text-muted-foreground">{generatedResponse.content}</p>

          {generatedResponse.items.length > 0 && (
            <div className="mt-4 grid gap-3">
              {generatedResponse.items.map((item: any, idx: number) => (
                <div key={idx} className="p-3 bg-white dark:bg-slate-900 rounded-lg border flex justify-between items-center shadow-sm">
                  <span className="font-medium">{item.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">{item.issue}</span>
                    {item.severity === 'critical' ? (
                      <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">Critical</span>
                    ) : (
                      <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full font-medium">Warning</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="stat-card p-4 animate-fade-in">
          <p className="text-sm text-muted-foreground">Critical Alerts</p>
          <p className="text-2xl font-bold text-destructive">
            {initialInsights.filter(i => i.type === 'critical').length}
          </p>
        </div>
        <div className="stat-card p-4 animate-fade-in">
          <p className="text-sm text-muted-foreground">Warnings</p>
          <p className="text-2xl font-bold text-warning">
            {initialInsights.filter(i => i.type === 'warning').length}
          </p>
        </div>
        <div className="stat-card p-4 animate-fade-in">
          <p className="text-sm text-muted-foreground">Recommendations</p>
          <p className="text-2xl font-bold text-primary">
            {initialInsights.filter(i => i.type === 'recommendation').length}
          </p>
        </div>
        <div className="stat-card p-4 animate-fade-in">
          <p className="text-sm text-muted-foreground">Positive Trends</p>
          <p className="text-2xl font-bold text-success">
            {initialInsights.filter(i => i.type === 'success').length}
          </p>
        </div>
      </div>

      {/* Insights List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {initialInsights.map((insight) => {
          const Icon = insightIcons[insight.type];
          const styles = insightStyles[insight.type];

          return (
            <div
              key={insight.id}
              className={cn(
                "stat-card p-5 border-l-4 animate-fade-in hover:shadow-lg transition-all",
                styles.border,
                styles.bg
              )}
            >
              <div className="flex gap-4">
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0", styles.icon)}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{insight.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{insight.description}</p>

                  {insight.affectedSites && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {insight.affectedSites.map((site) => (
                        <span key={site} className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-md">
                          {site}
                        </span>
                      ))}
                    </div>
                  )}

                  {insight.action && (
                    <Button variant="link" size="sm" className="px-0 mt-3 h-auto text-primary">
                      {insight.action}
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InsightsSection;
