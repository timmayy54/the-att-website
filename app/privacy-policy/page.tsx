import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | TheAttReviews",
  description: "Privacy Policy for TheAttReviews - Learn how we collect, use, and protect your data",
};

export default function PrivacyPolicy() {
  return (
    <div className="prose dark:prose-invert max-w-none py-8">
      <h1>Privacy Policy</h1>
      <p>Last updated: March 26, 2024</p>

      <h2>Introduction</h2>
      <p>
        Welcome to TheAttReviews ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
      </p>

      <h2>Information We Collect</h2>
      <p>We may collect, use, store, and transfer different kinds of personal data about you, which we have grouped together as follows:</p>
      <ul>
        <li><strong>Identity Data</strong> includes first name, last name, username, or similar identifier.</li>
        <li><strong>Contact Data</strong> includes email address.</li>
        <li><strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
        <li><strong>Usage Data</strong> includes information about how you use our website.</li>
      </ul>

      <h2>How We Collect Your Data</h2>
      <p>We use different methods to collect data from and about you including through:</p>
      <ul>
        <li><strong>Direct interactions.</strong> You may give us your Identity and Contact Data by filling in forms or by corresponding with us by email or otherwise.</li>
        <li><strong>Automated technologies or interactions.</strong> As you interact with our website, we may automatically collect Technical Data about your equipment, browsing actions, and patterns. We collect this personal data by using cookies, server logs, and other similar technologies.</li>
        <li><strong>Third parties.</strong> We may receive personal data about you from various third parties such as analytics providers like Google.</li>
      </ul>

      <h2>Cookies</h2>
      <p>
        We use cookies and similar tracking technologies to track the activity on our website and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
      </p>
      <p>
        We use the following types of cookies:
      </p>
      <ul>
        <li><strong>Essential Cookies.</strong> These cookies are necessary for the website to function properly.</li>
        <li><strong>Analytical/Performance Cookies.</strong> These allow us to recognize and count the number of visitors and to see how visitors move around our website when they are using it.</li>
        <li><strong>Functionality Cookies.</strong> These are used to recognize you when you return to our website.</li>
        <li><strong>Targeting Cookies.</strong> These cookies record your visit to our website, the pages you have visited, and the links you have followed.</li>
      </ul>

      <h2>Google Analytics</h2>
      <p>
        We use Google Analytics, a web analytics service provided by Google, Inc. Google Analytics uses cookies to help us analyze how users use our site. The information generated by the cookie about your use of the website will be transmitted to and stored by Google on servers in the United States.
      </p>
      <p>
        Google will use this information for the purpose of evaluating your use of the website, compiling reports on website activity, and providing other services relating to website activity and internet usage. Google may also transfer this information to third parties where required to do so by law, or where such third parties process the information on Google's behalf.
      </p>

      <h2>Google AdSense</h2>
      <p>
        We use Google AdSense to display advertisements on our website. Google AdSense may use cookies to personalize the advertisements that you see. No personally identifiable information is collected by these cookies.
      </p>
      <p>
        You can opt-out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google's Ads Settings</a>.
      </p>

      <h2>How We Use Your Data</h2>
      <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
      <ul>
        <li>To register you as a new user.</li>
        <li>To improve our website, products/services, marketing, or customer relationships.</li>
        <li>To make recommendations to you about goods or services that may be of interest to you.</li>
        <li>To administer and protect our business and this website.</li>
      </ul>

      <h2>Data Security</h2>
      <p>
        We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed.
      </p>

      <h2>Your Legal Rights</h2>
      <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:</p>
      <ul>
        <li>Request access to your personal data.</li>
        <li>Request correction of your personal data.</li>
        <li>Request erasure of your personal data.</li>
        <li>Object to processing of your personal data.</li>
        <li>Request restriction of processing your personal data.</li>
        <li>Request transfer of your personal data.</li>
        <li>Right to withdraw consent.</li>
      </ul>

      <h2>Changes to This Privacy Policy</h2>
      <p>
        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us at: [Your Contact Email]
      </p>
    </div>
  );
} 