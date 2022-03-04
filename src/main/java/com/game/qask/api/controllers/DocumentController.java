package com.game.qask.api.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("doc")
@Controller
public class DocumentController {
    /*private final DocumentService documentService;
    private final PersonService personService;

    @Autowired
    public DocumentController(DocumentService documentService, PersonService personService) {
        this.documentService = documentService;
        this.personService = personService;
    }

    @ResponseBody
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getDocumentById(@PathVariable Long id){
        return new ResponseEntity<>(documentService.getDocumentById(id), HttpStatus.OK);
    }

    @PostMapping()
    @ResponseBody
    public ResponseEntity<Map<String, Object>> addNewDocument(@RequestBody Document document){
        HashMap<String, Object> documentView = new HashMap<>();
        documentView.put("Document", "received");
        document.setPerson(personService.getPersonById(document.getUserID()).orElse(new Person()));
        if(document.getStatus()==DocStatus.OK && document.getDocType()== DocType.RESPONSE){
            documentService.updateRequestInProgressDocumentStatusByUserName(document.getReceiver(), DocStatus.ACCEPTED);
        }
        if(document.getStatus() == DocStatus.DONE && document.getDocType() == DocType.REPORT){
            documentService.updateResponseOkStatusByDocId(document.getTargetDocId(), DocStatus.IN_PROGRESS);
        }
        documentService.addDocument(document);
        return new ResponseEntity<>(documentView, HttpStatus.OK);
    }

    @PostMapping("/accept-report")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> acceptReport(@RequestBody Document document){
        HashMap<String, Object> documentView = new HashMap<>();
        documentView.put("Document", "received"); //TODO начислить баллы
        Document doc = documentService.getDocumentOptionalById(document.getTargetDocId()).orElse(null);
        if(doc != null){
            String s = doc.getDescription().split("Cost:")[1];
            String s2 = s.split(";")[0];
            s2 = s2.trim();
            Integer points = 0;
            try{
                points = Integer.parseInt(s2);
            }catch (NumberFormatException ex){
                System.err.println(ex.getMessage());
            }
            Map<String, Object> docView = documentService.getDocumentById(document.getTargetDocId());
            Object obj = docView.get("receiver");
            String receiver = null;
            if((obj instanceof String) && obj != null){
                receiver = (String)obj;
                personService.addPointsToPersonByUserName(receiver, points);
            }


        }
        documentService.updateReportDoneStatusByDocId(document.getId(), DocStatus.OK);
        documentService.updateResponseInProgressStatusByDocId(document.getTargetDocId(), document.getStatus());
        return new ResponseEntity<>(documentView, HttpStatus.OK);
    }

    @GetMapping("/request/{username}")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> getInProgressRequestByUserName(@PathVariable String username){
        Map<String, Object> documentView;

        documentView = documentService.getInProgressRequestByUserName(username);

        return new ResponseEntity<>(documentView, HttpStatus.OK);
    }
    @GetMapping("/projectsHistory/{username}")
    public ResponseEntity<Map<String,Map<String, Map<String, String>>>> getProjectsHistory(@PathVariable String username){
        ArrayList<Document> documents = documentService.getProjectsHistoryByUsername(username);
        ArrayList<DocumentVO> documentVOS = new ArrayList<>();
        documents.forEach(d -> {
            documentVOS.add(new DocumentVO(d.getId(), d.getDocType(), d.getDate(), d.getStatus(), d.getUsername(), d.getDescription(), d.getReceiver(), d.getUserID(), d.getTargetDocId()));
        });
        HashMap<String, Map<String, Map<String, String>>> documentsResult = new LinkedHashMap<>();
        documentsResult.put("documents", documentService.getDocumentVOArrayView(documentVOS));
        return new ResponseEntity<>(documentsResult, HttpStatus.OK);
    }

    @GetMapping("/reports")
    public ResponseEntity<Map<String,Map<String, Map<String, String>>>> getAllDoneReports(){
        ArrayList<Document> documents = documentService.getAllDoneReports();
        ArrayList<DocumentVO> documentVOS = new ArrayList<>();
        documents.forEach(d -> {
            documentVOS.add(new DocumentVO(d.getId(), d.getDocType(), d.getDate(), d.getStatus(), d.getUsername(), d.getDescription(), d.getReceiver(), d.getUserID(), d.getTargetDocId()));
        });
        HashMap<String, Map<String, Map<String, String>>> documentsResult = new LinkedHashMap<>();
        documentsResult.put("documents", documentService.getDocumentVOArrayView(documentVOS));
        return new ResponseEntity<>(documentsResult, HttpStatus.OK);
    }

    @PutMapping("/remove/{id}")
    public ResponseEntity<Map<String, String>> removeProject(@PathVariable Long id){  //in fact project just goes to reject status
        Map<String, String> result = new HashMap<>();
        documentService.updateDocStatusByDocId(id, DocStatus.REJECTED);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }*/
}
