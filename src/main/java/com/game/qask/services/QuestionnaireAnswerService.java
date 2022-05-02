package com.game.qask.services;

import com.game.qask.api.documents.AnswerType;
import com.game.qask.api.documents.QuestionType;
import com.game.qask.api.documents.QuestionnaireStatus;
import com.game.qask.dao.QuestionnaireAnswerDAO;
import com.game.qask.model.*;
import com.game.qask.view.QuestionnaireVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.*;

/**
 * сервис по сути делает некоторые манипуляции с воходными данными (запросами к "базе") и делает запрос к DAO слою
 * после чего возвращает требуемые данные
 */
@Service
public class QuestionnaireAnswerService {

    private final QuestionnaireAnswerDAO questionnaireAnswerDAO;

    @Autowired
    public QuestionnaireAnswerService(QuestionnaireAnswerDAO questionnaireAnswerDAO) {
        this.questionnaireAnswerDAO = questionnaireAnswerDAO;
    }

    public QuestionnaireAnswer addQuestionnaireAnswer(QuestionnaireAnswer questionnaireAnswer){
        return questionnaireAnswerDAO.save(questionnaireAnswer);
    }
    /*public Map<String, Object> getQuestionnaireAnswerById(Long id){
        Map<String, Object> resultMap = new HashMap<>();
        if(!id.equals(-1L)){
            Optional<QuestionnaireAnswer> optionalQuestionnaireAnswer = questionnaireAnswerDAO.findById(id);
            QuestionnaireView questionnaireView;
            try {
                questionnaireView = new QuestionnaireView(optionalQuestionnaireAnswer.get());
                resultMap = questionnaireView.getParams();
            }catch (NoSuchElementException nsEx){
                nsEx.printStackTrace();
            }
        }
        else{
            resultMap.put("id", new Long(-1));
        }
        return resultMap;
    }*/

    public Optional<QuestionnaireAnswer> getQuestionnaireAnswerOptionalById(Long id){
        return questionnaireAnswerDAO.findById(id);
    }

    public ArrayList<QuestionnaireAnswer> getQuestionnairesAnswerByQuestQuest(Long id){
        return questionnaireAnswerDAO.findQuestionnairesAnswerByQuestQuest(id);
    }

    public Optional<QuestionnaireAnswer> updateQuestionnaireAnswerById(Long id, QuestionnaireAnswer newQuestionnaireAnswer){
        QuestionnaireAnswer oldQuestionnaireAnswer = questionnaireAnswerDAO.findById(id).orElse(null);
        if(oldQuestionnaireAnswer == null){
            return Optional.empty();
        }
        oldQuestionnaireAnswer.setDate(newQuestionnaireAnswer.getDate());
        oldQuestionnaireAnswer.setQuestionnaireType(newQuestionnaireAnswer.getQuestionnaireType());
        oldQuestionnaireAnswer.setAnswers(newQuestionnaireAnswer.getAnswers());
        oldQuestionnaireAnswer.setStatus(newQuestionnaireAnswer.getStatus());
        oldQuestionnaireAnswer.setCreatorID(newQuestionnaireAnswer.getCreatorID());
        oldQuestionnaireAnswer.setCreatorName(newQuestionnaireAnswer.getCreatorName());
        oldQuestionnaireAnswer.setTitle(newQuestionnaireAnswer.getTitle());
        oldQuestionnaireAnswer.setUser(newQuestionnaireAnswer.getUser());
        return Optional.ofNullable(questionnaireAnswerDAO.save(oldQuestionnaireAnswer));
    }

    public Optional<QuestionnaireAnswer> updateStatusById(Long id, QuestionnaireStatus newStatus){
        QuestionnaireAnswer oldQuestionnaire = questionnaireAnswerDAO.findById(id).orElse(null);
        if(oldQuestionnaire == null){
            return Optional.empty();
        }
        oldQuestionnaire.setStatus(newStatus);
        return Optional.ofNullable(questionnaireAnswerDAO.save(oldQuestionnaire));
    }

    public ArrayList<ArrayList<Object>>  getQAStatsByQuestQuest(Long id, ArrayList<Question> questions) {
        ArrayList<QuestionnaireAnswer> qAnswers = getQuestionnairesAnswerByQuestQuest(id);

        ArrayList<ArrayList<Object>> qas = new ArrayList<>(); //массив анкет

        for (int i = 0; i < qAnswers.size(); i++){
            for(int j = 0; j < qAnswers.get(i).getAnswers().size(); j++){ //проходим по массиву блок-ответов в анкете и зипихиваем их в массив
                if(i == 0){
                    ArrayList<Object> answerBlock = new ArrayList<>();
                    //get(j) - анкета
                    qas.add(answerBlock);
                }
                int suggestionsSize = 0;
                if(questions.get(j).getQuestionType() != QuestionType.RATING){
                    suggestionsSize = questions.get(j).getSuggestions().size(); //список предложений (т.к. нету списка выборов)
                }else{
                    suggestionsSize = Integer.parseInt(questions.get(j).getSuggestions().get(0).getText()); //список предложений (т.к. нету списка выборов)
                }

                for(int k = 0; k < suggestionsSize; k++){ //проходим по массиву предложений в блок-ответе и запихиваем их в массив
                    Double choice = 0d;
                    ArrayList<Integer> arr;
                    if(i == 0){
                        choice = 0d;
                    }else{
                        if(questions.get(j).getQuestionType() != QuestionType.SORTED){
                            choice = (Double) qas.get(j).get(k);
                        }else{
                            arr = (ArrayList<Integer>) qas.get(j).get(k); //это choice, но с вариантами расположений
                        }
                    }


                    if(questions.get(j).getQuestionType() == QuestionType.SINGLE) {
                        String text = qAnswers.get(i).getAnswers().get(j).getText();
                        int selectedChoice = Integer.parseInt(text);
                        int isSelectedChoice = 0;
                        if(selectedChoice == k){
                            isSelectedChoice = 1;
                        }
                        choice += isSelectedChoice;
                        //get(j).get(k) - ответ-блок
                        if(i == 0){
                            qas.get(j).add(choice);
                        }else{
                            qas.get(j).set(k, choice);
                        }
                    } else if (questions.get(j).getQuestionType() == QuestionType.MULTI) {
                        String text = qAnswers.get(i).getAnswers().get(j).getText();
                        List<String> choices = Arrays.asList(text.split("\\|"));
                        int isSelectedChoice = 0;
                        if(choices.contains(String.valueOf(k))){
                            isSelectedChoice = 1;
                        }
                        choice += isSelectedChoice;
                        //get(j).get(k) - ответ-блок
                        if(i == 0){
                            qas.get(j).add(choice);
                        }else{
                            qas.get(j).set(k, choice);
                        }
                    } else if (questions.get(j).getQuestionType() == QuestionType.RATING) {
                        String text = qAnswers.get(i).getAnswers().get(j).getText();
                        int selectedChoice = Integer.parseInt(text);
                        int isSelectedChoice = 0;
                        if(selectedChoice == (k+1)){
                            isSelectedChoice = 1;
                        }
                        choice += isSelectedChoice;
                        //get(j).get(k) - ответ-блок
                        if(i == 0){
                            qas.get(j).add(choice);
                        }else{
                            qas.get(j).set(k, choice);
                        }
                    } else if (questions.get(j).getQuestionType() == QuestionType.SORTED) {
                        String text = qAnswers.get(i).getAnswers().get(j).getText();
                        List<String> choices = Arrays.asList(text.split("\\|"));

                        ArrayList<Integer> choicesOrders = new ArrayList<>();

                        if(i == 0){
                            for(int g = 0; g < choices.size(); g++){
                                String[] sss = choices.get(g).split(":");
                                if(k == Integer.parseInt(sss[0])){
                                    choicesOrders.add(1);
                                }else{
                                    choicesOrders.add(0);
                                }
                            }
                            qas.get(j).add(choicesOrders);
                        }else{
                            choicesOrders = (ArrayList<Integer>) qas.get(j).get(k);
                            for(int g = 0; g < choicesOrders.size(); g++){
                                String[] sss = choices.get(g).split(":");
                                if(k == Integer.parseInt(sss[0])){
                                    Integer tmp = choicesOrders.get(g);
                                    tmp++;
                                    choicesOrders.set(g, tmp);
                                }
                            }
                            qas.get(j).set(k, choicesOrders);
                        }
                    } else if (questions.get(j).getQuestionType() == QuestionType.SEMANTIC) {
                        String text = qAnswers.get(i).getAnswers().get(j).getText();
                        List<String> choices = Arrays.asList(text.split("\\|"));

                        List<String> s = Arrays.asList(choices.get(k).split(":"));
                        int selectedChoice = Integer.parseInt(s.get(1));

                        int isSelectedChoice = selectedChoice;
                        choice += isSelectedChoice;
                        //get(j).get(k) - ответ-блок
                        if(i == 0){
                            qas.get(j).add(choice);
                        }else{
                            qas.get(j).set(k, choice);
                        }
                    } else if (questions.get(j).getQuestionType() == QuestionType.DISTRIBUTE) {
                        String text = qAnswers.get(i).getAnswers().get(j).getText();
                        List<String> choices = Arrays.asList(text.split("\\|"));

                        List<String> s = Arrays.asList(choices.get(k).split(":"));
                        int selectedChoice = Integer.parseInt(s.get(1));

                        int isSelectedChoice = selectedChoice;
                        choice += isSelectedChoice;
                        //get(j).get(k) - ответ-блок
                        if(i == 0){
                            qas.get(j).add(choice);
                        }else{
                            qas.get(j).set(k, choice);
                        }
                    }


                }
            }
        }


        return qas;
    }
}
