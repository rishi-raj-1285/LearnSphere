import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AccessibilityModal from './components/AccessibilityModal';
import StudySessionModal from './components/StudySessionModal';
import Toast from './components/Toast';

import Auth from './pages/Auth';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Workspace from './pages/Workspace';
import Documents from './pages/Documents';
import DocumentStudy from './pages/DocumentStudy';
import Conversations from './pages/Conversations';
import AiPlan from './pages/AiPlan';
import ProfileSettings from './pages/ProfileSettings';

import {
  EMPTY_STUDENT_PROFILE,
  DEMO_DOCUMENTS
} from './data/initialData';

import {
  getStoredToken,
  setStoredToken,
  authApi,
  userApi,
  documentsApi,
  conversationsApi
} from './api/client';

export default function App() {
  const [authReady, setAuthReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [studentProfile, setStudentProfile] = useState(EMPTY_STUDENT_PROFILE);
  const [userDocuments, setUserDocuments] = useState([]);
  const [conversations, setConversations] = useState([]);

  const documents = [...userDocuments, ...DEMO_DOCUMENTS];

  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeDocument, setActiveDocument] = useState(DEMO_DOCUMENTS[0]);
  const [activeConversationId, setActiveConversationId] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('English');
  const [accessibility, setAccessibility] = useState({
    textSize: 'normal',
    highContrast: false,
    simplifiedLayout: false,
    voiceSpeed: '1.0x'
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAccessibilityModalOpen, setIsAccessibilityModalOpen] = useState(false);
  const [isStudySessionModalOpen, setIsStudySessionModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const [toasts, setToasts] = useState([]);

  const addToast = (message) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const applyProfile = useCallback((profile) => {
    setStudentProfile(profile);
    setCurrentLanguage(profile.primaryLanguage || 'English');
    setAccessibility(
      profile.accessibility || {
        textSize: 'normal',
        highContrast: false,
        simplifiedLayout: false,
        voiceSpeed: '1.0x'
      }
    );
  }, []);

  const loadUserData = useCallback(async () => {
    const profileRes = await userApi.getProfile();
    applyProfile(profileRes.profile);

    const [docsRes, convRes] = await Promise.all([
      documentsApi.list(),
      conversationsApi.list()
    ]);

    setUserDocuments(docsRes.data || []);
    const convList = convRes.data || [];
    setConversations(convList);
    if (convList.length > 0) {
      setActiveConversationId(convList[0].id);
    }
  }, [applyProfile]);

  useEffect(() => {
    const token = getStoredToken();
    if (!token) {
      setAuthReady(true);
      return;
    }

    authApi
      .me()
      .then(async (res) => {
        applyProfile(res.user);
        setIsAuthenticated(true);
        await loadUserData();
      })
      .catch(() => {
        setStoredToken(null);
        setIsAuthenticated(false);
      })
      .finally(() => setAuthReady(true));
  }, [applyProfile, loadUserData]);

  useEffect(() => {
    document.body.classList.toggle('high-contrast', Boolean(accessibility.highContrast));
    document.body.classList.toggle('simplified-layout', Boolean(accessibility.simplifiedLayout));
    document.body.classList.remove('font-size-medium', 'font-size-large');
    if (accessibility.textSize === 'medium') {
      document.body.classList.add('font-size-medium');
    } else if (accessibility.textSize === 'large') {
      document.body.classList.add('font-size-large');
    }
  }, [accessibility]);

  const handleAuthenticated = async (user) => {
    applyProfile(user);
    setIsAuthenticated(true);
    try {
      await loadUserData();
    } catch (err) {
      addToast(err.message || 'Could not load your saved data');
    }
  };

  const handleLogout = () => {
    setStoredToken(null);
    setIsAuthenticated(false);
    setStudentProfile(EMPTY_STUDENT_PROFILE);
    setUserDocuments([]);
    setConversations([]);
    setActiveConversationId(null);
    addToast('Signed out. Your JWT remains valid until it expires on the server.');
  };

  const persistProfile = async (profile) => {
    setStudentProfile(profile);
    try {
      const res = await userApi.updateProfile(profile);
      applyProfile(res.profile);
    } catch (err) {
      addToast(err.message || 'Could not save profile to server');
    }
  };

  const handleCompleteOnboarding = async (profile) => {
    const completed = { ...profile, onboardingCompleted: true };
    setStudentProfile(completed);
    setCurrentLanguage(completed.primaryLanguage || 'English');
    setAccessibility(completed.accessibility || accessibility);
    setActiveTab('dashboard');
    try {
      const res = await userApi.updateProfile(completed);
      applyProfile(res.profile);
      addToast('Welcome to LearnSphere! Your learning profile is saved.');
    } catch (err) {
      addToast(err.message || 'Profile saved locally; sync failed');
    }
  };

  const handleResetOnboarding = async () => {
    const updated = { ...studentProfile, onboardingCompleted: false };
    setStudentProfile(updated);
    try {
      await userApi.updateProfile({ onboardingCompleted: false });
    } catch {
      /* ignore */
    }
    addToast('Restarting student onboarding setup');
  };

  const handleLanguageChange = async (newLang) => {
    setCurrentLanguage(newLang);
    const updated = { ...studentProfile, primaryLanguage: newLang };
    setStudentProfile(updated);
    try {
      await userApi.updatePreferences({ primaryLanguage: newLang });
    } catch {
      /* ignore */
    }
    addToast(`Language updated to ${newLang}`);
  };

  const handleUpdateAccessibility = async (newAcc) => {
    setAccessibility(newAcc);
    const updated = { ...studentProfile, accessibility: newAcc };
    setStudentProfile(updated);
    try {
      await userApi.updatePreferences({ accessibility: newAcc });
    } catch {
      /* ignore */
    }
  };

  const handleOpenDocumentStudy = (doc) => {
    setActiveDocument(doc);
    setActiveTab('doc-study');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenConversationInWorkspace = (convId) => {
    setActiveConversationId(convId);
    setActiveTab('workspace');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUploadDocument = async (file, subject) => {
    const res = await documentsApi.upload(file, subject);
    setUserDocuments((prev) => [res.data, ...prev]);
    return res.data;
  };

  const handleCreateConversation = async (payload) => {
    const linkedId = payload.documentId && !String(payload.documentId).startsWith('doc-')
      ? payload.documentId
      : undefined;

    const res = await conversationsApi.create({
      title: payload.title,
      subject: payload.subject,
      language: payload.language,
      documentId: linkedId
    });
    setConversations((prev) => [res.data, ...prev]);
    setActiveConversationId(res.data.id);
    return res.data;
  };

  const handlePersistMessages = async (conversationId, userMsg, assistantMsg, titlePatch) => {
    const isBackendConv = !String(conversationId).startsWith('conv-');

    if (!isBackendConv) {
      if (titlePatch) {
        setConversations((prev) =>
          prev.map((c) => (c.id === conversationId ? { ...c, title: titlePatch } : c))
        );
      }
      return conversationId;
    }

    if (titlePatch) {
      await conversationsApi.update(conversationId, { title: titlePatch });
    }

    await conversationsApi.addMessage(conversationId, {
      role: 'user',
      text: userMsg.text,
      clientMessageId: userMsg.id
    });

    if (assistantMsg) {
      await conversationsApi.addMessage(conversationId, {
        role: 'assistant',
        text: assistantMsg.text,
        sourceRef: assistantMsg.sourceRef,
        bookmarked: assistantMsg.bookmarked
      });
    }

    const list = await conversationsApi.list();
    setConversations(list.data || []);
    return conversationId;
  };

  if (!authReady) {
    return (
      <div className="app-container" style={{ padding: '48px', textAlign: 'center' }}>
        Loading LearnSphere…
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <Auth onAuthenticated={handleAuthenticated} />
        <Toast toasts={toasts} onDismiss={dismissToast} />
      </>
    );
  }

  if (!studentProfile?.onboardingCompleted) {
    return (
      <>
        <Onboarding
          initialProfile={studentProfile}
          onCompleteOnboarding={handleCompleteOnboarding}
        />
        <Toast toasts={toasts} onDismiss={dismissToast} />
      </>
    );
  }

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Student Dashboard';
      case 'workspace':
        return 'Vidya — AI Study Chatbot';
      case 'ai-plan':
        return 'AI Plan — PDF & Mentor Roadmaps';
      case 'documents':
        return 'My Documents & Notes';
      case 'doc-study':
        return 'Study Interface';
      case 'conversations':
        return 'Study Conversations';
      case 'profile':
        return 'My Learning Profile';
      case 'settings':
        return 'Platform Settings';
      default:
        return 'LearnSphere';
    }
  };

  return (
    <div className="app-container">
      <Sidebar
        activeTab={activeTab}
        onSelectTab={(tabId) => {
          setActiveTab(tabId);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="main-wrapper">
        <Navbar
          pageTitle={getPageTitle()}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          currentLanguage={currentLanguage}
          onLanguageChange={handleLanguageChange}
          onOpenAccessibility={() => setIsAccessibilityModalOpen(true)}
          onOpenStudySession={() => setIsStudySessionModalOpen(true)}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          studentProfile={studentProfile}
          onNavigateProfile={() => setActiveTab('profile')}
        />

        <main className="content-area" role="main">
          {activeTab === 'dashboard' && (
            <Dashboard
              studentProfile={studentProfile}
              documents={documents}
              conversations={conversations}
              onNavigateTab={(tab, payload) => {
                if (tab === 'workspace' && payload) {
                  handleOpenConversationInWorkspace(payload);
                } else {
                  setActiveTab(tab);
                }
              }}
              onOpenDocumentStudy={handleOpenDocumentStudy}
              onOpenStudySession={() => setIsStudySessionModalOpen(true)}
              onTriggerUpload={() => {
                setActiveTab('documents');
                setIsUploadModalOpen(true);
              }}
            />
          )}

          {activeTab === 'workspace' && (
            <Workspace
              conversations={conversations}
              setConversations={setConversations}
              activeConversationId={activeConversationId}
              setActiveConversationId={setActiveConversationId}
              documents={documents}
              onOpenDocumentStudy={handleOpenDocumentStudy}
              onAddToast={addToast}
              currentLanguage={currentLanguage}
              onLanguageChange={handleLanguageChange}
              onCreateConversation={handleCreateConversation}
              onPersistMessages={handlePersistMessages}
            />
          )}

          {activeTab === 'documents' && (
            <Documents
              documents={documents}
              setDocuments={setUserDocuments}
              onOpenDocumentStudy={handleOpenDocumentStudy}
              onNavigateTab={setActiveTab}
              onAddToast={addToast}
              isUploadModalOpen={isUploadModalOpen}
              setIsUploadModalOpen={setIsUploadModalOpen}
              onUploadDocument={handleUploadDocument}
            />
          )}

          {activeTab === 'doc-study' && (
            <DocumentStudy
              document={activeDocument}
              onBack={() => setActiveTab('documents')}
              onNavigateTab={setActiveTab}
              onAddToast={addToast}
              currentLanguage={currentLanguage}
            />
          )}

          {activeTab === 'conversations' && (
            <Conversations
              conversations={conversations}
              setConversations={setConversations}
              onOpenConversationInWorkspace={handleOpenConversationInWorkspace}
              onAddToast={addAddToast}
            />
          )}

          {activeTab === 'ai-plan' && (
            <AiPlan
              documents={documents}
              onOpenDocumentStudy={handleOpenDocumentStudy}
              onAddToast={addToast}
              studentProfile={studentProfile}
              setStudentProfile={persistProfile}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileSettings
              activeView="profile"
              studentProfile={studentProfile}
              setStudentProfile={persistProfile}
              accessibility={accessibility}
              updateAccessibility={handleUpdateAccessibility}
              onResetOnboarding={handleResetOnboarding}
              onAddToast={addToast}
              onLogout={handleLogout}
            />
          )}

          {activeTab === 'settings' && (
            <ProfileSettings
              activeView="settings"
              studentProfile={studentProfile}
              setStudentProfile={persistProfile}
              accessibility={accessibility}
              updateAccessibility={handleUpdateAccessibility}
              onResetOnboarding={handleResetOnboarding}
              onAddToast={addToast}
              onLogout={handleLogout}
            />
          )}
        </main>
      </div>

      <AccessibilityModal
        isOpen={isAccessibilityModalOpen}
        onClose={() => setIsAccessibilityModalOpen(false)}
        accessibility={accessibility}
        updateAccessibility={handleUpdateAccessibility}
      />

      <StudySessionModal
        isOpen={isStudySessionModalOpen}
        onClose={() => setIsStudySessionModalOpen(false)}
        studentProfile={studentProfile}
        onAddToast={addToast}
        useBackend
      />

      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
