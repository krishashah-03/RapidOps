import React, { useEffect, useRef, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { AlertCircle, CheckCircle, Clock, FileText, AlertTriangle, ArrowUpRight, FileOutput, X , Upload  } from 'lucide-react';
// import { useState } from "react";
import axios from "axios";

// const results = [
//     {
//         "test": "Verify that the search input field is clickable.",
//         "status": "FAIL",
//         "error": "Message: element not interactable\n  (Session info: chrome=134.0.6998.178)\nStacktrace:\n\tGetHandleVerifier [0x00007FF61CB74C25+3179557]\n\t(No symbol) [0x00007FF61C7D88A0]\n\t(No symbol) [0x00007FF61C668FFC]\n\t(No symbol) [0x00007FF61C6C0EA4]\n\t(No symbol) [0x00007FF61C6B2A24]\n\t(No symbol) [0x00007FF61C6E7C2A]\n\t(No symbol) [0x00007FF61C6B22D6]\n\t(No symbol) [0x00007FF61C6E7E40]\n\t(No symbol) [0x00007FF61C7102F3]\n\t(No symbol) [0x00007FF61C6E7A03]\n\t(No symbol) [0x00007FF61C6B06D0]\n\t(No symbol) [0x00007FF61C6B1983]\n\tGetHandleVerifier [0x00007FF61CBD67CD+3579853]\n\tGetHandleVerifier [0x00007FF61CBED1D2+3672530]\n\tGetHandleVerifier [0x00007FF61CBE2153+3627347]\n\tGetHandleVerifier [0x00007FF61C94092A+868650]\n\t(No symbol) [0x00007FF61C7E2FFF]\n\t(No symbol) [0x00007FF61C7DF4A4]\n\t(No symbol) [0x00007FF61C7DF646]\n\t(No symbol) [0x00007FF61C7CEAA9]\n\tBaseThreadInitThunk [0x00007FF8A481E8D7+23]\n\tRtlUserThreadStart [0x00007FF8A695BF6C+44]\n",
//         "expected": "no_error",
//         "type": "input_fields"
//     },
//     {
//         "test": "Verify that the search input field accepts text input (e.g., 'Mumbai').",
//         "status": "PASS",
//         "expected": "no_error",
//         "type": "buttons"
//     },
//     {
//         "test": "Verify that the search input field works by searching for 'Goa'.",
//         "status": "PASS",
//         "expected": "no_error",
//         "type": "buttons"
//     },
//     {
//         "test": "Verify if clicking the search button opens the location suggestions with the input 'Delhi'.",
//         "status": "FAIL",
//         "error": "Message: element not interactable\n  (Session info: chrome=134.0.6998.178)\nStacktrace:\n\tGetHandleVerifier [0x00007FF61CB74C25+3179557]\n\t(No symbol) [0x00007FF61C7D88A0]\n\t(No symbol) [0x00007FF61C668FFC]\n\t(No symbol) [0x00007FF61C6C0EA4]\n\t(No symbol) [0x00007FF61C6B2A24]\n\t(No symbol) [0x00007FF61C6E7C2A]\n\t(No symbol) [0x00007FF61C6B22D6]\n\t(No symbol) [0x00007FF61C6E7E40]\n\t(No symbol) [0x00007FF61C7102F3]\n\t(No symbol) [0x00007FF61C6E7A03]\n\t(No symbol) [0x00007FF61C6B06D0]\n\t(No symbol) [0x00007FF61C6B1983]\n\tGetHandleVerifier [0x00007FF61CBD67CD+3579853]\n\tGetHandleVerifier [0x00007FF61CBED1D2+3672530]\n\tGetHandleVerifier [0x00007FF61CBE2153+3627347]\n\tGetHandleVerifier [0x00007FF61C94092A+868650]\n\t(No symbol) [0x00007FF61C7E2FFF]\n\t(No symbol) [0x00007FF61C7DF4A4]\n\t(No symbol) [0x00007FF61C7DF646]\n\t(No symbol) [0x00007FF61C7CEAA9]\n\tBaseThreadInitThunk [0x00007FF8A481E8D7+23]\n\tRtlUserThreadStart [0x00007FF8A695BF6C+44]\n",
//         "expected": "no_error",
//         "type": "input_fields"
//     }
// ]

// const tests = [
//     {
//       "description": "Verify that the user can click on the search bar and the cursor should appear",
//       "type": "input_fields",
//       "action": "click",
//       "xpath": "//*[@id=\"react-application\"]/DIV[1]/DIV[1]/DIV[1]/DIV[1]/DIV[3]/DIV[2]/DIV[1]/DIV[1]/DIV[1]/HEADER[1]/DIV[1]/DIV[2]/DIV[2]/DIV[1]/DIV[1]/DIV[1]/FORM[1]/DIV[1]/DIV[1]/DIV[1]/INPUT[1]",
//       "expected": "no_error",
//       "timeout": 10
//     },
//     {
//       "description": "Verify that the user can click on the 'Stays' tab",
//       "type": "buttons",
//       "action": "click",
//       "xpath": "//*[@id=\"search-block-tab-STAYS\"]",
//       "expected": "no_error",
//       "timeout": 10
//     },
//     {
//       "description": "Verify that the user can click on the 'Experiences' tab",
//       "type": "buttons",
//       "action": "click",
//       "xpath": "//*[@id=\"search-block-tab-EXPERIENCES\"]",
//       "expected": "no_error",
//       "timeout": 10
//     },
//     {
//       "description": "Verify user can enter text in location input field",
//       "type": "input_fields",
//       "action": "input",
//       "xpath": "//*[@id=\"bigsearch-query-location-input\"]",
//       "input": "Mumbai",
//       "expected": "Mumbai",
//       "timeout": 10
//     },
//     {
//       "description": "Verify user can click on search button",
//       "type": "buttons",
//       "action": "click",
//       "xpath": "//*[@id=\"search-tabpanel\"]/DIV[1]/DIV[5]/DIV[2]/DIV[2]/BUTTON[1]",
//       "expected": "no_error",
//       "timeout": 20
//     }
//   ]

const TestAutomationDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showGeneratedTests, setShowGeneratedTests] = useState(false);
  const [fileName, setFileName] = useState("");
  const [requirements, setRequirements] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [showTagline, setShowTagline] = useState(true);

  const [testResults, setTestResults] = useState({ passed: 0, failed: 0, total: 0 });
  const [pieData, setPieData] = useState([]);
  const [errors, setErrors] = useState([]);
  const [results , setResults] = useState([]);
  const [error, setError] = useState(null);
// const [testedTestCases,setTestedCases] = useState([])
  const [loading, setLoading] = useState(false);
const [tests,setTests] = useState([]);

const [generatedTestCases,setGeneratedTestCases]= useState([])


  useEffect(() => {
    console.log(showGeneratedTests)
    if (!showGeneratedTests) return;
    console.log("hello")

    setLoading(true);
    let attempts = 0;
    const interval = setInterval(() => {
      fetch("http://localhost:8080/test_cases")
        .then((response) => {
          if (!response.ok) throw new Error("File not found");
          return response.json();
        })
        .then((json) => {
          setTests(json);
          console.log(tests);
          setError(null);
          setLoading(false);
          clearInterval(interval);
        })
        .catch((err) => {
          if (attempts >= 1) {
            setError("File not found after multiple attempts.");
            setLoading(false);
            clearInterval(interval);
          }
        });

      attempts++;
    }, 5000);

    return () => clearInterval(interval);
  }, [showGeneratedTests]);
//   useEffect(() => {
//     if (!showGeneratedTests) return; // Fetch only when showGenerated is true

//     fetch("/data.json")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("File not found");
//         }

//         console.log(response.json())
//         return response.json();
        
//       })
//       .then((json) => setResults(json))
//       .catch((err) => setError(err.message));
//    }, [showGeneratedTests]); // Runs when showGenerated changes

useEffect(() => {
    if (!results || results.length === 0) return;

    const passed = results.filter(test => test.status === "PASS").length;
    const failed = results.filter(test => test.status === "FAIL").length;
    const total = results.length;

    setTestResults({ passed, failed, total });

    setPieData([
      { name: "Passed", value: passed, color: "#50C878" },
      { name: "Failed", value: failed, color: "#FF5733" }
    ]);

    setErrors(
      results
        .filter(test => test.status === "FAIL")
        .map(test => ({
          component: test.type,
          description: test.test,
          action:test.action,
          severity: "High"
        }))
    );



  }, [results]);

   
    const testTestCases = (tests) => {
        return tests.map((test, index) => ({
          id: `TC-${String(index + 1).padStart(3, "0")}`,
          description: test.test,
          status: "High",
          priority: "High",
          status:test.status,
          type: test.type,
        //   action : test.action
        }));
      };
      
    
    
    const testedTestCases = testTestCases(results)



  

  const handleRunTestCases = () => {
    setLoading(true);
    let attempts = 0;

    const interval = setInterval(() => {
      fetch("http://localhost:8080/results")
        .then((response) => {
          if (!response.ok) throw new Error("File not found");
          return response.json();
        })
        .then((data) => {
          setResults(data);
          setLoading(false);
          clearInterval(interval); // Stop checking after success
          setShowTagline(false)
        })
        .catch((err) => {
          if (attempts >= 1) { // Stop retrying after 2.5 sec (5 * 500ms)
            setLoading(false);
            clearInterval(interval);
            setShowTagline(false)
          }
        });

      attempts++;
    }, 500); // Retry every 500ms
  };

//   const testTestCases = (tests) => {
//     return tests.map((test, index) => ({
//       id: TC-${String(index + 1).padStart(3, "0")},
//       description: test.test,
//       status: "High",
//       priority: "High",
//       status:test.status,
//       type: test.type,
//     //   action : test.action
//     }));
//   };
  

//   const testedTestCases = testTestCases(results);


  // Test data
//   const testResults = {
//     passed: 18,
//     failed: 4,
//     total: 22
//   };
  
//   // Changed colors to specified values: green #50C878 and red #FF5733
//   const pieData = [
//     { name: 'Passed', value: testResults.passed, color: '#50C878' },
//     { name: 'Failed', value: testResults.failed, color: '#FF5733' }
//   ];

//   const errors = [
//     { component: 'Login Form', description: 'Button click event not triggered', severity: 'High' },
//     { component: 'User Dashboard', description: 'Data not loading in table', severity: 'Medium' },
//     { component: 'Payment Gateway', description: 'Form validation missing', severity: 'High' }
//   ];
  
  
//   const testCases = [
//     { id: 'TC-001', description: 'Verify user login with valid credentials', status: 'Passed', priority: 'High', type: 'Functional' },
//     { id: 'TC-002', description: 'Verify user login with invalid credentials', status: 'Passed', priority: 'High', type: 'Functional' },
//     { id: 'TC-003', description: 'Verify password reset functionality', status: 'Failed', priority: 'Medium', type: 'Functional' },
//     { id: 'TC-004', description: 'Verify user registration form validation', status: 'Failed', priority: 'High', type: 'Validation' }
//   ];
  
  // Generated test cases that will appear when button is clicked
//   const generatedTestCases = [
//     { id: 'TC-005', description: 'Verify form field validation for special characters in all input fields across application', status: 'New', priority: 'Medium', type: 'Validation' },
//     { id: 'TC-006', description: 'Test login persistence after browser refresh and session timeout scenarios', status: 'New', priority: 'Low', type: 'Functional' },
//     { id: 'TC-007', description: 'Validate error messages for incorrect input formats in payment processing and registration', status: 'New', priority: 'Medium', type: 'Validation' },
//     { id: 'TC-008', description: 'Check responsive layout on mobile devices with various screen sizes', status: 'New', priority: 'High', type: 'UI/UX' }
//   ];

useEffect(()=>{
    const generateTestCases = (tests) => {
        console.log(tests);
        return tests.map((test, index) => ({
          id: `TC-${String(index + 1).padStart(3, "0")}`,
          description: test.description,
          status: "High",
          priority: "High",
          type: test.type,
          action : test.action
        }));
      };
      const data3 = generateTestCases(tests)

      setGeneratedTestCases(()=>data3)
      console.log(generatedTestCases)
      
},[tests,showGeneratedTests])

  
//   const generatedTestCases = generateTestCases(tests);

//   console.log(generatedTestCases)
  
  
  const cicdSteps = [
    { name: 'Test Generation', completed: true },
    { name: 'Test Execution', completed: true },
    { name: 'Build', completed: true },
    { name: 'Deploy', completed: true }
  ];
  
  // Historical test run data for trend analysis
  const trendData = [
    { date: 'Mar 24', passed: 15, failed: 7, total: 22, coverage: 68 },
    { date: 'Mar 25', passed: 16, failed: 6, total: 22, coverage: 70 },
    { date: 'Mar 26', passed: 16, failed: 5, total: 21, coverage: 72 },
    { date: 'Mar 27', passed: 17, failed: 5, total: 22, coverage: 73 },
    { date: 'Mar 28', passed: 17, failed: 4, total: 21, coverage: 74 },
    { date: 'Mar 29', passed: 18, failed: 4, total: 22, coverage: 75 }
  ];
  
  // Feature-based test analysis - improved data for better bar chart visualization
  const featureData = [
    { name: 'Authentication', passed: 5, failed: 1, total: 6, coverage: 90 },
    { name: 'User Profile', passed: 4, failed: 1, total: 5, coverage: 85 },
    { name: 'Payments', passed: 4, failed: 2, total: 6, coverage: 70 },
    { name: 'Admin Panel', passed: 3, failed: 0, total: 3, coverage: 65 },
    { name: 'Reports', passed: 2, failed: 0, total: 2, coverage: 60 }
  ];
  
  // Performance metrics
  const performanceData = {
    averageExecutionTime: '3.2s',
    slowestTest: 'Payment Processing (8.5s)',
    fastestTest: 'Login Validation (0.8s)',
    totalExecutionTime: '1m 12s'
  };

  // Handle generate test cases button click
  const handleGenerateTestCases = async () => {
    
    const formData = new FormData();
    formData.append("requirements", requirements);
    formData.append("websiteLink", websiteLink);
    if (file) {
      formData.append("file", file);
    }
    console.log(formData)

    try {
      const response = await axios.post("http://localhost:8080/generate", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }

    setShowGeneratedTests(true);
  };

 

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

   // Handle file drop area click
   const handleFileAreaClick = () => {
    fileInputRef.current.click();
  };

  // Handle file drop
  const handleDrop = (event) => {
    event.preventDefault();
    if (event.dataTransfer.files.length) {
      const droppedFile = event.dataTransfer.files[0];
      setFile(droppedFile);
      setFileName(droppedFile.name);
    }
  };

  // Prevent default behavior for drag events
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  // Custom rendering for the pie chart label
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
   `${(percent * 100).toFixed(0)}%`
      </text>
    );
  };

  return (
    
    <div className="bg-slate-50 p-4 h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-indigo-800">Test Automation Dashboard</h1>
        <div className="text-sm text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full">Last updated: Today at 14:55</div>
      </div>
      
      <div className="grid grid-cols-12 gap-4">
        {/* Input Area - Expanded width */}
       
        <>
        <Card className="col-span-12 lg:col-span-5 border-indigo-200 shadow-md">
          <CardHeader className="pb-2 bg-indigo-50 rounded-t-lg">
            <CardTitle className="text-indigo-700">Input Test Requirements</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              <div>
                <input 
                  type="text" 
                  placeholder="Enter application requirements or test scenarios..." 
                  className="w-full p-2 border rounded-md border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                />
              </div>
              <div>
                <input 
                  type="text" 
                  placeholder="Enter Website  link..." 
                  className="w-full p-2 border rounded-md border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={websiteLink}
                  onChange={(e) => setWebsiteLink(e.target.value)}
                />
              </div>
              {/* <div className="border-dashed border-2 border-indigo-300 rounded-md p-4 text-center text-indigo-500 text-sm hover:bg-indigo-50 cursor-pointer">
                Drag & drop files or click to browse
                
              </div> */}
              <div 
className={`border-dashed border-2 ${fileName ? 'border-indigo-500 bg-indigo-50' : 'border-indigo-300'} rounded-md p-4 text-center hover:bg-indigo-50 cursor-pointer transition-colors duration-200`}                onClick={handleFileAreaClick}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  className="hidden" 
                />
                <div className="flex flex-col items-center justify-center">
                  <Upload className="h-6 w-6 text-indigo-500 mb-2" />
                  {!fileName ? (
                    <div className="text-indigo-500 text-sm">
                      <p>Drag & drop files or click to browse</p>
                    </div>
                  ) : (
                    <div className="text-indigo-700 text-sm font-medium">
                      <p>File attached: {fileName}</p>
                      <p className="text-xs text-indigo-500 mt-1">Click to change file</p>
                    </div>
                  )}
                </div>
              </div>
              <button 
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md w-full transition-colors duration-300"
                onClick={handleGenerateTestCases}
              >
                Generate Test Cases
              </button>
            </div>
            
            {/* Generated Test Cases shown within the input section - Improved layout */}
            {!loading ? (
              <div className="mt-6 border border-indigo-200 rounded-md bg-white shadow-sm">
                <div className="flex justify-between items-center bg-indigo-50 p-2 rounded-t-md">
                  <div className="text-sm font-medium text-indigo-700">Generated Test Cases</div>
                  <button 
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => setShowGeneratedTests(false)}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="p-2 max-h-64 overflow-y-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-3/5">Description</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">Type</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {generatedTestCases.map((test) => (
                        <tr key={test.id} className="hover:bg-gray-50">
                          <td className="px-3 py-2 text-xs text-gray-500">
                            <div className="line-clamp-2">{test.description}</div>
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-xs">
                            <span 
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                test.type === 'Functional' ? 'bg-indigo-100 text-indigo-800' : 
                                test.type === 'Validation' ? 'bg-blue-100 text-blue-800' : 
                                'bg-purple-100 text-purple-800'
                              }`}
                            >
                              {test.type}
                            </span>
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-xs">
                            <button className="text-indigo-600 hover:text-indigo-800">{test.action}</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* <div className="bg-gray-50 p-2 border-t border-gray-200 rounded-b-md">
                  <button className="text-xs text-indigo-600 hover:text-indigo-800">View all in Test Cases tab</button>
                </div> */}
                </div>
                <button 
                className="bg-indigo-600 hover:bg-indigo-700 text-white  my-2 px-4 py-2 rounded-md w-full transition-colors duration-300"
                onClick={handleRunTestCases}
              >
                Run Test Cases
              </button>
              </div>
              
            ) : <div className="overlay-1">
                <div className="loader-1"></div>
                <p>Working On Your Request</p>
              </div>}
          </CardContent>
        </Card>
        
        {/* Tabs Section - Adjusted width */}
        <Card className="col-span-12 lg:col-span-7 border-indigo-200 shadow-md">
    
      {showTagline ? <div className="flex items-center justify-center h-screen">
      {showTagline && (
        <p className=" text-indigo-800 text-2xl font-semibold  px-4">
          Enter your prompt or upload a file to get started!
        </p>
      )}
    </div>:
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none px-4 bg-indigo-50">
                <TabsTrigger value="overview" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">Overview</TabsTrigger>
                <TabsTrigger value="testCases" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">Test Cases</TabsTrigger>
                <TabsTrigger value="cicd" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">CI/CD Pipeline</TabsTrigger>
                <TabsTrigger value="errors" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">Error Report</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Test Results Summary Card - Fixed pie chart display */}
                  <Card className="border-indigo-200 shadow-sm">
                    <CardHeader className="pb-2 bg-indigo-50 rounded-t-lg">
                      <CardTitle className="text-sm font-medium text-indigo-700">Test Results Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between">
                        <div className="w-24 h-24"> {/* Reduced the size from 32 to 24 */}
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={20}
                                outerRadius={30}
                                paddingAngle={1}
                                dataKey="value"
                                // labelLine={false}
                                // label={renderCustomizedLabel}
                              >
                                {pieData.map((entry, index) => (
                                 <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip formatter={(value, name) => [`${value}`, name]} />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="ml-2 space-y-2">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-emerald-400 mr-2" style={{ backgroundColor: '#50C878' }}></div>
                            <span className="text-sm">Passed: {testResults.passed}</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#FF5733' }}></div>
                            <span className="text-sm">Failed: {testResults.failed}</span>
                          </div>
                          {/* <div className="text-sm text-gray-500 mt-1">Coverage: 75%</div> */}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-indigo-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 bg-indigo-50 rounded-t-lg">
                      <CardTitle className="text-sm font-medium text-indigo-700">Latest Deployment</CardTitle>
                      <CheckCircle className="h-4 w-4 text-green-500" style={{ color: '#50C878' }} />
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="text-green-500" style={{ color: '#50C878' }}>Deployment completed successfully</div>
                      <div className="text-xs text-gray-500">Today at 14:55</div>
                    </CardContent>
                  </Card>
                  
                  {/* <Card className="border-indigo-200 shadow-sm">
                    <CardHeader className="pb-2 bg-indigo-50 rounded-t-lg">
                      <CardTitle className="text-sm font-medium text-indigo-700">Critical Issues</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="text-2xl font-bold text-pink-600" style={{ color: '#FF5733' }}>2</div>
                      <div className="text-xs text-gray-500">High priority issues needing attention</div>
                      <button className="mt-2 text-xs text-indigo-600 hover:text-indigo-800">View details</button>
                    </CardContent>
                  </Card> */}
                </div>
                
                {/* Trend Analysis */}
                <Card className="border-indigo-200 shadow-sm mb-4">
                  <CardHeader className="pb-2 bg-indigo-50 rounded-t-lg">
                    <CardTitle className="text-sm font-medium text-indigo-700">Test Trend Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="h-60">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={trendData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="passed" stroke="#50C878" name="Passed Tests" strokeWidth={2} />
                          <Line type="monotone" dataKey="failed" stroke="#FF5733" name="Failed Tests" strokeWidth={2} />
                          <Line type="monotone" dataKey="coverage" stroke="#0EA5E9" name="Coverage %" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Feature-based Analysis - Improved Bar Chart */}
                <Card className="border-indigo-200 shadow-sm">
                  <CardHeader className="pb-2 bg-indigo-50 rounded-t-lg">
                    <CardTitle className="text-sm font-medium text-indigo-700">Feature Coverage Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={featureData}
                          margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                          barGap={0}
                          barCategoryGap="20%"
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                          <XAxis 
                            dataKey="name" 
                            tick={{ fill: '#4B5563' }} 
                            axisLine={{ stroke: '#E5E7EB' }}
                            tickLine={false}
                            dy={10}
                          />
                          <YAxis 
                            tick={{ fill: '#4B5563' }} 
                            axisLine={{ stroke: '#E5E7EB' }}
                            tickLine={false}
                          />
                          <Tooltip 
                            cursor={{fill: 'rgba(224, 231, 255, 0.2)'}}
                            contentStyle={{
                              borderRadius: '6px',
                              border: '1px solid #E5E7EB',
                              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                            }}
                          />
                          <Bar 
                            dataKey="passed" 
                            stackId="a" 
                            fill="#50C878" 
                            name="Passed" 
                            barSize={30} 
                            radius={[4, 4, 0, 0]}
                          />
                          <Bar 
                            dataKey="failed" 
                            stackId="a" 
                            fill="#FF5733" 
                            name="Failed" 
                            barSize={30} 
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="testCases" className="px-4 py-2">
                {/* Added a Generate Report button above the table */}
                <div className="flex justify-end mb-4">
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors duration-300 flex items-center">
                    <FileOutput className="h-4 w-4 mr-2" />
                    Generate Report
                  </button>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-indigo-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Type</th>
                      {/* <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Actions</th> */}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[...(testedTestCases ? testedTestCases : [])].map((test) => (
                      <tr key={test.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{test.id}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          <div className="line-clamp-2">{test.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span 
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              test.status === 'Passed' ? 'bg-green-100' : 
                              test.status === 'Failed' ? 'bg-red-100' : 
                              'bg-gray-100'
                            }`}
                            style={{ 
                              backgroundColor: test.status === 'PASS' ? 'rgba(80, 200, 120, 0.2)' : 
                                             test.status === 'FAIL' ? 'rgba(255, 87, 51, 0.2)' : 
                                             'rgba(107, 114, 128, 0.2)',
                              color: test.status === 'Passed' ? '#50C878' : 
                                    test.status === 'Failed' ? '#FF5733' : 
                                    '#6B7280'
                            }}
                          >
                            {test.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span 
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              test.type === 'Functional' ? 'bg-indigo-100 text-indigo-800' : 
                              test.type === 'Validation' ? 'bg-blue-100 text-blue-800' : 
                              'bg-purple-100 text-purple-800'
                            }`}
                          >
                            {test.type}
                          </span>
                        </td>
                        {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-indigo-600 hover:text-indigo-900 mr-2">View</button>
                          <button className="text-indigo-600 hover:text-indigo-900">Run</button>
                        </td> */}
                        {/* <td className="px-3 py-2 whitespace-nowrap text-xs">
                            <button className="text-indigo-600 hover:text-indigo-800">{test.action}</button>
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TabsContent>
              
              <TabsContent value="cicd" className="p-4">
                <div className="flex items-center justify-between max-w-2xl mx-auto mb-8">
                  {cicdSteps.map((step, index) => (
                    <React.Fragment key={step.name}>
                      <div className="flex flex-col items-center">
                        <div className={`rounded-full w-10 h-10 flex items-center justify-center ${
                          step.completed ? 'bg-indigo-600 text-white' : 'bg-gray-200'
                        }`}>
                          {step.completed && <CheckCircle className="h-5 w-5" />}
                        </div>
                        <div className="text-sm mt-2">{step.name}</div>
                      </div>
                      {index < cicdSteps.length - 1 && (
                        <div className={`h-1 w-16 ${
                          cicdSteps[index + 1].completed ? 'bg-indigo-600' : 'bg-gray-200'
                        }`}></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <div className="mt-6 text-center font-medium mb-4" style={{ color: '#50C878' }}>
                  All pipeline steps completed successfully
                </div>
                
                {/* Performance Metrics */}
                <Card className="border-indigo-200 shadow-sm">
                  <CardHeader className="pb-2 bg-indigo-50 rounded-t-lg">
                    <CardTitle className="text-sm font-medium text-indigo-700">Test Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white p-3 rounded-md border border-indigo-100">
                        <div className="text-xs text-gray-500">Avg. Execution Time</div>
                        <div className="text-lg font-semibold text-indigo-700">{performanceData.averageExecutionTime}</div>
                      </div>
                      <div className="bg-white p-3 rounded-md border border-indigo-100">
                        <div className="text-xs text-gray-500">Slowest Test</div>
                        <div className="text-lg font-semibold" style={{ color: '#FF5733' }}>{performanceData.slowestTest}</div>
                      </div>
                      <div className="bg-white p-3 rounded-md border border-indigo-100">
                        <div className="text-xs text-gray-500">Fastest Test</div>
                        <div className="text-lg font-semibold" style={{ color: '#50C878' }}>{performanceData.fastestTest}</div>
                      </div>
                      <div className="bg-white p-3 rounded-md border border-indigo-100">
                        <div className="text-xs text-gray-500">Total Execution Time</div>
                        <div className="text-lg font-semibold text-indigo-700">{performanceData.totalExecutionTime}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="errors" className="p-4">
                <div className="space-y-4">
                  {errors.map((error, index) => (
                    <div 
                      key={index} 
                      className="border-l-4 p-4 bg-white shadow rounded-md hover:shadow-md transition-shadow"
                      style={{ borderLeftColor: error.severity === 'High' ? '#FF5733' : '#ffb347' }}
                    >
                      <div className="flex justify-between">
                        <div className="font-medium flex items-center">
                          {error.severity === 'High' ? 
                            <AlertCircle className="h-4 w-4 mr-2" style={{ color: '#FF5733' }} /> : 
                            <AlertTriangle className="h-4 w-4 mr-2" style={{ color: '#ffb347' }} />
                          }
                          {error.component}
                        </div>
                        <div 
                          className="text-sm font-semibold rounded-full px-2 py-0.5"
                          style={{ 
                            backgroundColor: error.severity === 'High' ? 'rgba(255, 87, 51, 0.2)' : 'rgba(255, 179, 71, 0.2)',
                            color: error.severity === 'High' ? '#FF5733' : '#ffb347'
                          }}
                        >
                          {error.severity}
                        </div>
                      </div>
                      <div className="text-gray-600 text-sm mt-1 ml-6">{error.description}</div>
                      <div className="mt-2 ml-6">
                        <button className="text-indigo-600 hover:text-indigo-900 text-sm mr-3 inline-flex items-center">
                          <FileText className="h-3 w-3 mr-1" /> View Details
                        </button>
                        <button className="text-indigo-600 hover:text-indigo-900 text-sm inline-flex items-center">
                          <ArrowUpRight className="h-3 w-3 mr-1" /> Fix Automatically
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>}
        </Card>
      </>
   </div>
    </div>
  );
};

export default TestAutomationDashboard;