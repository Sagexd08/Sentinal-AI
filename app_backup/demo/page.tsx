import ContentModerationForm from '@/components/ContentModerationForm';

export default function DemoPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Content Moderation Demo</h1>
          <p className="text-gray-500">
            Try out our AI-powered content moderation system
          </p>
        </div>
        
        <ContentModerationForm />
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">How It Works</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Enter any text content in the form above</li>
            <li>Our AI agent system analyzes the content for potential issues</li>
            <li>The system provides a risk assessment and recommendation</li>
            <li>Content is stored in our moderation database for further review if needed</li>
          </ol>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Try These Examples:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Normal content: "This is a beautiful day for a walk in the park."</li>
              <li>Mild profanity: "This product is damn good but a bit expensive."</li>
              <li>Sensitive content: "Information about self-harm methods should be restricted."</li>
              <li>Harmful content: "I hate everyone and want to hurt them."</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
