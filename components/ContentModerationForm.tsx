'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, AlertTriangle, CheckCircle } from 'lucide-react';
import api from '@/lib/api';

export default function ContentModerationForm() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasToken, setHasToken] = useState(false);

  // Check if token exists on component mount
  useState(() => {
    const token = localStorage.getItem('sentinal_token');
    setHasToken(!!token);
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('Please enter some content to analyze');
      return;
    }
    
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const response = await api.flagContent(content);
      setResult(response);
    } catch (err: any) {
      setError(err.message || 'An error occurred while analyzing the content');
    } finally {
      setLoading(false);
    }
  };

  const getTestToken = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await api.getTestToken();
      setHasToken(true);
    } catch (err: any) {
      setError(err.message || 'Failed to get test token');
    } finally {
      setLoading(false);
    }
  };

  const renderAnalysisResult = () => {
    if (!result) return null;
    
    const analysis = result.ai_analysis;
    if (!analysis) return null;
    
    const riskColor = 
      analysis.risk_level === 'high' ? 'text-red-500' :
      analysis.risk_level === 'medium' ? 'text-yellow-500' : 
      'text-green-500';
    
    return (
      <div className="mt-4 space-y-2">
        <h3 className="text-lg font-medium">Analysis Results</h3>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-sm text-gray-500">Risk Level</p>
            <p className={`font-medium ${riskColor}`}>{analysis.risk_level}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Risk Score</p>
            <p className="font-medium">{(analysis.risk_score * 100).toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Categories</p>
            <div className="flex flex-wrap gap-1">
              {analysis.categories.map((category: string) => (
                <span 
                  key={category}
                  className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Recommendation</p>
            <p className="font-medium">
              {analysis.recommendation === 'approve' ? (
                <span className="text-green-500">Approve</span>
              ) : analysis.recommendation === 'reject' ? (
                <span className="text-red-500">Reject</span>
              ) : (
                <span className="text-yellow-500">Review</span>
              )}
            </p>
          </div>
        </div>
        {analysis.explanation && (
          <div>
            <p className="text-sm text-gray-500">Explanation</p>
            <p className="text-sm">{analysis.explanation}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Content Moderation</CardTitle>
        <CardDescription>
          Enter content to analyze for potential issues using our AI-powered moderation system.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!hasToken ? (
          <div className="space-y-4">
            <Alert variant="warning">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Authentication Required</AlertTitle>
              <AlertDescription>
                You need to authenticate to use the content moderation API.
              </AlertDescription>
            </Alert>
            <Button onClick={getTestToken} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Getting token...
                </>
              ) : (
                'Get Test Token'
              )}
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Textarea
                placeholder="Enter content to analyze..."
                className="min-h-[150px]"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            
            {error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {result && (
              <Alert variant="success">
                <CheckCircle className="h-4 w-4" />
                <AlertTitle>Content Analyzed</AlertTitle>
                <AlertDescription>
                  The content has been successfully analyzed.
                </AlertDescription>
              </Alert>
            )}
            
            {renderAnalysisResult()}
            
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Analyze Content'
              )}
            </Button>
          </form>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-xs text-gray-500">
          Powered by Sentinal AI Agent Hub
        </p>
      </CardFooter>
    </Card>
  );
}
